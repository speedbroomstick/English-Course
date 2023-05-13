import { socket } from "/js/authorization.js";
const startButton = document.getElementById("circlein");
const outlineElement = document.querySelector(".outline");

let mediaRecorder;
let chunks = [];
let switcher = true;
let width = 0;
startButton.addEventListener("click", function () {
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
});

socket.on(
  "answer_from_voice",
  (chetQuestions, questions, order, isAnswerCorrect) => {
    console.log(chetQuestions);
    console.log(questions);
    console.log(order);
    $("#questionH2").text(questions[order[chetQuestions]].question);
    $("#number_question").val(order[chetQuestions]);
    $("#chet_questions").val(chetQuestions);
    if (isAnswerCorrect) {
      width += 100 / order.length;
      console.log(width);
      $('.progress-bar').css('width', width+'%');
    }
    $("#questionH2").hide().fadeIn(500);
  }
);