import { socket } from "/js/authorization.js";
import { testModule } from "/js/app/testModule.js";

let test = new testModule();

const but1 = $("#but1").click(function () {
  test.sendAnswerToServer($("#but1").val(),"http://localhost:3000/chek_answer_level1");
});
const but2 = $("#but2").click(function () {
  test.sendAnswerToServer($("#but2").val(),"http://localhost:3000/chek_answer_level1");
});
const but3 = $("#but3").click(function () {
  test.sendAnswerToServer($("#but3").val(),"http://localhost:3000/chek_answer_level1");
});
const but4 = $("#but4").click(function () {
  test.sendAnswerToServer($("#but4").val(),"http://localhost:3000/chek_answer_level1");
});
socket.on("answer_level1",(isAnswerCorrect,allWords,order,orderOptions,chetQuestions,countToAdd) => {
    test.checkAnswer(isAnswerCorrect,allWords[order[chetQuestions]].translation,countToAdd);
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

    $("#questionH2, #but1, #but2, #but3, #but4").hide().fadeIn(500);
  }
);
