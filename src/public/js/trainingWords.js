import { socket } from "/js/authorization.js";
const but1 = $("#but1").click(function () {
  clickOption($("#but1").val());
});
const but2 = $("#but2").click(function () {
  clickOption($("#but2").val());
});
const but3 = $("#but3").click(function () {
  clickOption($("#but3").val());
});
const but4 = $("#but4").click(function () {
  clickOption($("#but4").val());
});
socket.on(
  "answersToTest",
  (chetQuestions, allWords, order, orderOptions, isAnswerCorrect) => {
    $("#question").val(allWords[order[chetQuestions]].word);
    $("#questionH2").text(allWords[order[chetQuestions]].word);
    $("#number_question").val(order[chetQuestions]);
    $("#chet_questions").val(chetQuestions);
    $("#but1")
      .val(orderOptions[chetQuestions][0])
      .text(orderOptions[chetQuestions][0]);
    $("#but2")
      .val(orderOptions[chetQuestions][1])
      .text(orderOptions[chetQuestions][1]);
    $("#but3")
      .val(orderOptions[chetQuestions][2])
      .text(orderOptions[chetQuestions][2]);
    $("#but4")
      .val(orderOptions[chetQuestions][3])
      .text(orderOptions[chetQuestions][3]);
    
    if (isAnswerCorrect) {
      $(".correct").text(function (index, text) {
        return parseInt(text) + 1;
      });
    } else {
      $(".total").text(function (index, text) {
        return parseInt(text) + 1;
      });
    }
    
    $("#questionH2, #but1, #but2, #but3, #but4").hide().fadeIn(500);
    
  }
);
function clickOption(answer) {
  let question = $("#question").val();
  let numberQuestion = $("#number_question").val();
  let chetQuestions = $("#chet_questions").val();
  $.ajax({
    url: "http://localhost:3000/chek_answer",
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
