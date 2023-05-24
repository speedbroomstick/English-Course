import { socket } from "/js/authorization.js";
let courses = [];
let dictionaryGroupSearch =[];
let wordsSearch= [];
let usersSearch =[];
let testsSearch = [];
let questionsSearch = [];
let allDataCourses;
let dictionaryGroup;
let wordsData;
let users;
let tests;
let questionsData;
let courseID;
let testId;
let questionId;
document.getElementById('question').addEventListener('input', function(event) {
  event.preventDefault();
    if(questionsSearch.includes(event.target.value)){
      questionsData.forEach(element =>{
        if(element.question == event.target.value){
          $("#answer").val(element.answer);
          $("#inputType").val(element.type_i);
          $("#outputType").val(element.type_oi);
          $("#testID").val(testsSearch[element.test_id-1]);
          questionId = element.idquestion;
        }
      })
    }
});
document.getElementById('testName').addEventListener('input', function(event) {
  event.preventDefault();
    if(testsSearch.includes(event.target.value)){
      tests.forEach(element =>{
        if(element.name == event.target.value){
          $("#testDesc").val(element.description);
          $("#testCourse").val(courses[element.id_course-1]);
          testId = element.idtest;
        }
      })
    }
});
document.getElementById('courseName').addEventListener('input', function(event) {
  event.preventDefault();
    if(courses.includes(event.target.value)){
      allDataCourses.forEach(element =>{
        if(element.name == event.target.value){
          $("#courseDesc").val(element.description);
          $("#courseLevel").val(element.level);
          courseID = element.id_course;
        }
      })
    }
});
document.getElementById('groupName').addEventListener('input', function(event) {
  event.preventDefault();
    if(dictionaryGroupSearch.includes(event.target.value)){
      dictionaryGroup.forEach(element =>{
        if(element.name == event.target.value){
          $("#groupDesc").val(element.description);
        }
      })
    }
});
document.getElementById('word').addEventListener('input', function(event) {
  event.preventDefault();
    if(wordsSearch.includes(event.target.value)){
      wordsData.forEach(element =>{
        if(element.word == event.target.value){
          $("#translation").val(element.translation);
          $("#example").val(element.example);
        }
      })
    }
});
document.getElementById('login').addEventListener('input', function(event) {
  event.preventDefault();
    if(usersSearch.includes(event.target.value)){
      users.forEach(element =>{
        if(element.login == event.target.value){
          $("#password").val(element.password);
        }
      })
    }
});

socket.on("administrator",(dataCourses,dataDictionaryGroup,words,user,test,questions) => {
    questionsData = questions;
    tests = test;
    allDataCourses = dataCourses;
    dictionaryGroup = dataDictionaryGroup;
    wordsData = words;
    users = user;
    questions.forEach(element => {
      questionsSearch.push(element.question);
    });
    test.forEach(element => {
      testsSearch.push(element.name);
    });
    dataDictionaryGroup.forEach(element => {
      dictionaryGroupSearch.push(element.name);
    });
    words.forEach(element => {
      wordsSearch.push(element.word);
    });
    dataCourses.forEach(element => {
      courses.push(element.name);
    });
    user.forEach(element => {
      usersSearch.push(element.login);
    });
  }
  );

  $(function() {
    fetch("http://localhost:3000/getAllInformation", {
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
      // курсы
    $("#coursesAdd").click(function () {
      const data = {
        courseName: $("#courseName").val(),
        courseDesc: $("#courseDesc").val(),
        courseLevel: $("#courseLevel").val(),
        type: "add"
      };
      clickButonChange("coursesChange",data);
    });
    $("#coursesUpdate").click(function () {
      const data = {
        courseName: $("#courseName").val(),
        courseDesc: $("#courseDesc").val(),
        courseLevel: $("#courseLevel").val(),
        courseID:courseID,
        type: "update"
      };
      clickButonChange("coursesChange",data);   
   });
    $("#coursesDelete").click(function () {
      const data = {
        courseID:courseID,
        type: "delete"
      };
      clickButonChange("coursesChange",data);   
    });
    //тесты
    $("#testAdd").click(function () {
      const data = {
        testName: $("#testName").val(),
        testDesc: $("#testDesc").val(),
        testCourse: $("#testCourse").val(),
        type: "add"
      };
      clickButonChange("testChange",data);
    });
    $("#testUpdate").click(function () {
      const data = {
        testName: $("#testName").val(),
        testDesc: $("#testDesc").val(),
        testCourse: $("#testCourse").val(),
        testId:testId,
        type: "update"
      };
      clickButonChange("testChange",data);   
   });
    $("#testDelete").click(function () {
      const data = {
        testId:testId,
        type: "delete"
      };
      clickButonChange("testChange",data);   
    });
    //question
    $("#questionAdd").click(function () {
      const data = {
        question: $("#question").val(),
        answer: $("#answer").val(),
        inputType: $("#inputType").val(),
        outputType: $("#outputType").val(),
        testID: $("#testID").val(),
        type: "add"
      };
      clickButonChange("questionChange",data);
    });
    $("#questionUpdate").click(function () {
      const data = {
        question: $("#question").val(),
        answer: $("#answer").val(),
        inputType: $("#inputType").val(),
        outputType: $("#outputType").val(),
        testID: $("#testID").val(),
        questionId: questionId,
        type: "update"
      };
      clickButonChange("questionChange",data);   
   });
    $("#questionDelete").click(function () {
      const data = {
        questionId:questionId,
        type: "delete"
      };
      clickButonChange("questionChange",data);   
    });
function clickButonChange(url,data){
  console.log("Click!!");
  fetch("http://localhost:3000/"+url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/show_panel_admin";
      } else {
        console.error("Ошибка при получении ответа от сервера.");
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса:", error);
    });
}