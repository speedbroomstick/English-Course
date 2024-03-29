import { socket } from "/js/authorization.js";
import { testModule } from "/js/app/testModule.js";

let test = new testModule();
let curentInput;
$(".answer-input").first().focus();
$("#finishInput").on("input", (event) => {
  event.preventDefault();
  let answer = "";
  for (let i = 0; i < parseInt($("#countLeter").val()); i++) {
    answer += $("#optionInput" + i).val();
    $("#optionInput" + i).val("");
  }
  answer += $("#finishInput").val();
  test.sendAnswerToServer(answer,"http://localhost:3000/chek_answer_level2");
});
$(document).on("keydown", ".answer-input", function (e) {
  if (e.which === 8 && $(this).val().length === 0) {
    let prevInput = $(this).prev(".answer-input");
    if (prevInput.length) {
      prevInput.focus().val("");
    } else {
      let lastInput = $(".answer-input").last();
      lastInput.focus().val("");
    }
  }
});
$(document).on("keydown", "#finishInput", function (e) {
  console.log("dddd");
  if (e.which === 8 && $(this).val().length === 0) {
      curentInput.focus().val("");
  } 
});
$(document).on("input", ".answer-input", function () {
  if ($(this).val().length === 1) {
    let nextInput = $(this).next(".answer-input");
    curentInput = $(this);
    if (nextInput.length) {
      nextInput.focus();
    } else {
      $("#finishInput").focus();
    }
  }
});
socket.on("answer_level2",(isAnswerCorrect,allWords,order,chetQuestions,countToAdd,correctAnswer) => {
    
    test.checkAnswer(isAnswerCorrect,correctAnswer,countToAdd,"","");
    $("#finishInput").val("").blur();
    $("#question").val(allWords[order[chetQuestions]].translation);
    $("#questionH2").text(allWords[order[chetQuestions]].translation);
    $("#number_question").val(order[chetQuestions]);
    $("#chet_questions").val(chetQuestions);
    let length = allWords[order[chetQuestions]].word.length - 1;
    let html = '<input type="hidden" id="countLeter" value="' + length + '">';
    for (let i = 0; i < length; i++) {
      html +=
        '<input type="text" id="optionInput' +
        i +
        '" class="answer-input" maxlength="1">';
    }
    $("#optionInputDIV").html(html).hide().fadeIn();
    $(".answer-input").first().focus();

    $("#questionH2").hide().fadeIn(500);
  }
);
