import { socket } from "/js/authorization.js";

$("#finishInput").on("input", (event) => {
    event.preventDefault();
    let answer="";
  for (let i = 0; i < parseInt($("#countLeter").val()); i++) {
        answer += $("#optionInput"+i).val();
  }
  answer += $("#finishInput").val();
  console.log(answer);
  clickOption(answer);
});
$(document).on("input", ".answer-input", function() {
    if ($(this).val().length === 1) {
      let nextInput = $(this).next(".answer-input");
      if (nextInput.length) {
        nextInput.focus();
      } else {
        $("#finishInput").focus();
      }
    }
  });
socket.on(
  "answer_level2",
  (chetQuestions, allWords, order, orderOptions, isAnswerCorrect) => {
    $("#finishInput").val("").blur();
    $("#question").val(allWords[order[chetQuestions]].translation);
    $("#questionH2").text(allWords[order[chetQuestions]].translation);
    $("#number_question").val(order[chetQuestions]);
    $("#chet_questions").val(chetQuestions);
    let length = allWords[order[chetQuestions]].word.length - 1;
  let html = '<input type="hidden" id="countLeter" value="' + length +'">';
  for(let i = 0; i < length; i++) {
    html += '<input type="text" id="optionInput' + i + '" class="answer-input" maxlength="1">';
  }
  $("#optionInputDIV").html(html).hide().fadeIn();
  $('.answer-input').first().focus();

  if (isAnswerCorrect) {
    $(".correct").text((index, text) => parseInt(text) + 1);
  } else {
    $(".total").text((index, text) => parseInt(text) + 1);
    let wrongHTML = '<div id="notification">'+
                    '<span id="text">Правильный ответ:'+ allWords[order[chetQuestions-1]].word +'</span>'+
                    '</div>'
    $(wrongHTML).prependTo("body").fadeIn(500).fadeOut(3000);
  }
    $("#questionH2").hide().fadeIn(500);
  }
);
function clickOption(answer) {
  let question = $("#question").val();
  let numberQuestion = $("#number_question").val();
  let chetQuestions = $("#chet_questions").val();
  $.ajax({
    url: "http://localhost:3000/chek_answer_level2",
    method: "GET",
    data: {
      answer: answer,
      question: question,
      numberQuestion: numberQuestion,
      chetQuestions: chetQuestions,
    },
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
