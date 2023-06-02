import { socket } from "/js/authorization.js";
import { testModule } from "/js/app/testModule.js";

const startButton = document.getElementById("circlein");
const outlineElement = document.querySelector(".outline");
const test = new testModule();

let mediaRecorder;
let chunks = [];
let switcher = true;
let isButtonDisabled = false;

startButton.addEventListener("click", function () {
    if (!isButtonDisabled) {
    isButtonDisabled = true;
    setTimeout(function () {
      isButtonDisabled = false;
    }, 2000);

  if (switcher) {
    switcher = false;
    chunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function (e) {
          outlineElement.classList.remove("active"); 
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audioStream", audioBlob);
          formData.append("numberQuestion", $("#number_question").val());
          formData.append("chetQuestions", $("#chet_questions").val());

          fetch("http://localhost:3000/upload-audio", {
            method: "POST",
            body: formData
          })
            .then(function (response) {
              console.log("Audio upload response:", response);
            })
            .catch(function (error) {
              console.error("Audio upload error:", error);
            });
        };

        mediaRecorder.start();
        outlineElement.classList.add("active");
      })
      .catch(function (error) {
        console.error("Ошибка доступа к микрофону:", error);
      });
  } else {
    switcher = true;
    mediaRecorder.stop();
    outlineElement.classList.remove("active");
  }
  }
});

socket.on(
  "answer_from_voice",
  (isAnswerCorrect,chetQuestions, questions, order,countToAdd,answerUser,video,rule) => {
    test.checkAnswer(isAnswerCorrect,answerUser,countToAdd,"courses_end","courses","Ваш ввод был:");
    $("#number_question").val(order[chetQuestions]);
    $("#chet_questions").val(chetQuestions);
    if(questions[order[chetQuestions]].type_oi == "video"){
      $(".rule-title").hide();
      $(".rule-description").hide();
      $('.tooltip-text').text(questions[order[chetQuestions]].answer);
      $("#questionH2").hide();
      $(".button-agree").hide();
      $(".box").show(500);
      let link;
      video.forEach(element => {
        if(element.idvideo == questions[order[chetQuestions]].question){
          link = element.link;
        }
      });

      $('source').attr('src', link);
      var videoElement = $('#my-video')[0];
      videoElement.load();
      $('.container_video').fadeIn(500);
  }else if(questions[order[chetQuestions]].type_oi == "text"){
    $(".rule-title").hide();
    $(".rule-description").hide();
    $('.container_video').hide();
    $(".button-agree").hide();
    $(".box").show(500);
    $("#questionH2").text(questions[order[chetQuestions]].question);
      $("#questionH2").fadeIn(500);
    }
    else{
      $('.container_video').hide();
      $(".box").hide();
      $(".button-agree").show(500);
      $("#questionH2").text(questions[order[chetQuestions]].question);
      $("#questionH2").fadeIn(500);
      rule.forEach(element =>{
        if(element.title == questions[order[chetQuestions]].question){
          $(".rule-title").show(500).text(element.title);
          $(".rule-description").show(500).text(element.ruleText);
        }
      });
    }
  }
  );
  $(".button-agree").click(function() {
    const options = {
      method: "POST",
    };
    fetch("http://localhost:3000/send_agree", options)
    .then((response) => {
      if (response.ok) {
        console.error("OK");
      } else {
        console.error("Ошибка при получении ответа от сервера.");
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса:", error);
    });
  });
  $(function() {
    let notification =
    '<div id="notification">' +
    '<span id="text">Для ввода нажмите на микрофон, скажите свой ответ, а затем нажмите ещё раз после окончания.' +
    "</span>" +
    "</div>";
  $(notification).prependTo("body").fadeIn(500).fadeOut(5000);
    fetch("http://localhost:3000/getAllInformationCourse", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
         console.log("ok");
        } else {
          console.error("Ошибка при получении ответа от сервера.");
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка при выполнении запроса:", error);
      });
    });

    socket.on("info_course",(type_oi,questions, order ,chetQuestions,video,rule) => {
      console.log(type_oi);
      if(type_oi == "text"){
          $(".rule-description").hide();
          $(".container_video").hide();
          $(".button-agree").hide();
       }else if(type_oi == "video"){
          $("#questionH2").hide();
          $(".button-agree").hide();
          let link;
          video.forEach(element => {
            if(element.idvideo == questions[order[chetQuestions]].question){
              link = element.link;
            }
          });
          console.log(link);
          $('source').attr('src', link);
          var videoElement = $('#my-video')[0];
          videoElement.load();
        }else{
          rule.forEach(element =>{
            if(element.title == questions[order[chetQuestions]].question){
              $(".rule-title").text(element.title);
              $(".rule-description").text(element.ruleText);
            }
          });
          $(".box").hide();
          $(".container_video").hide();
        }
    });