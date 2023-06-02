import { socket } from "/js/authorization.js";
let courses = [];
let dictionaryGroupSearch = [];
let wordsSearch = [];
let usersSearch = [];
let testsSearch = [];
let questionsSearch = [];
let videoSearch = [];
let allDataCourses;
let dictionaryGroup;
let wordsData;
let users;
let tests;
let questionsData;
let videoData;
let courseID;
let testId;
let questionId;
let videoIdTest;
$('.wrapper_video').hide();
$('#courseVideo').prop('disabled', true);
$("#courseVideo").change(function (event) {
  const file = event.target.files[0]; // Получить выбранный файл
  const reader = new FileReader();

  reader.onload = function (event) {
    const imgData = event.target.result; // Получить данные изображения

    // Найти элемент с идентификатором "pictureCourse" и установить данные изображения в качестве значения атрибута src
    $('source').attr('src', imgData);
        var videoElement = $('#my-video')[0];
        videoElement.load();
  };

  reader.readAsDataURL(file); // Прочитать содержимое файла в формате Data URL
});
$("#coursePhoto").change(function (event) {
  const file = event.target.files[0]; // Получить выбранный файл
  const reader = new FileReader();

  reader.onload = function (event) {
    const imgData = event.target.result; // Получить данные изображения

    // Найти элемент с идентификатором "pictureCourse" и установить данные изображения в качестве значения атрибута src
    $("#pictureCourse").attr("src", imgData);
  };

  reader.readAsDataURL(file); // Прочитать содержимое файла в формате Data URL
});
$('#videoCheck').change(function() {
  if ($(this).is(':checked')) {
    $('#videoLink').prop('readonly', true);
    $('#courseVideo').prop('disabled', false);
  } else {
    $('#videoLink').prop('readonly', false);
    $('#courseVideo').prop('disabled', true);
  }
});
document.getElementById("videoLink").addEventListener("input", function (event) {
  event.preventDefault();
  if (videoSearch.includes(event.target.value)) {
    videoData.forEach((element) => {
      if (element.link == event.target.value) {
        $("#readMode").val(element.idvideo);
        $("#videoDesc").val(element.description);
        $("#videoTest").val(testsSearch[element.test_id - 1]);
        $('source').attr('src', element.link);
        var videoElement = $('#my-video')[0];
        videoElement.load();
        videoIdTest = element.test_id;
      }
    });
  }
});
document.getElementById("question").addEventListener("input", function (event) {
  event.preventDefault();
  if (questionsSearch.includes(event.target.value)) {
    questionsData.forEach((element) => {
      if (element.question == event.target.value) {
        $("#answer").val(element.answer);
        $("#inputType").val(element.type_i);
        $("#outputType").val(element.type_oi);
        $("#testID").val(testsSearch[element.test_id - 1]);
        questionId = element.idquestion;
      }
    });
  }
});
document.getElementById("testName").addEventListener("input", function (event) {
  event.preventDefault();
  if (testsSearch.includes(event.target.value)) {
    tests.forEach((element) => {
      if (element.name == event.target.value) {
        $("#testDesc").val(element.description);
        $("#testCourse").val(courses[element.id_course - 1]);
        testId = element.idtest;
      }
    });
  }
});
document
  .getElementById("courseName")
  .addEventListener("input", function (event) {
    event.preventDefault();
    if (courses.includes(event.target.value)) {
      allDataCourses.forEach((element) => {
        if (element.name == event.target.value) {
          $("#pictureCourse").attr("src", element.photo);
          $("#courseDesc").val(element.description);
          $("#courseLevel").val(element.level);
          courseID = element.id_course;
        }
      });
    }
  });
document
  .getElementById("groupName")
  .addEventListener("input", function (event) {
    event.preventDefault();
    if (dictionaryGroupSearch.includes(event.target.value)) {
      dictionaryGroup.forEach((element) => {
        if (element.name == event.target.value) {
          $("#groupDesc").val(element.description);
        }
      });
    }
  });
document.getElementById("word").addEventListener("input", function (event) {
  event.preventDefault();
  if (wordsSearch.includes(event.target.value)) {
    wordsData.forEach((element) => {
      if (element.word == event.target.value) {
        $("#translation").val(element.translation);
        $("#example").val(element.example);
      }
    });
  }
});
document.getElementById("login").addEventListener("input", function (event) {
  event.preventDefault();
  if (usersSearch.includes(event.target.value)) {
    users.forEach((element) => {
      if (element.login == event.target.value) {
        $("#password").val(element.password);
      }
    });
  }
});

socket.on(
  "administrator",
  (dataCourses, dataDictionaryGroup, words, user, test, questions,video) => {
    videoData = video;
    questionsData = questions;
    tests = test;
    allDataCourses = dataCourses;
    dictionaryGroup = dataDictionaryGroup;
    wordsData = words;
    users = user;
    video.forEach((element) => {
      videoSearch.push(element.link);
    });
    questions.forEach((element) => {
      questionsSearch.push(element.question);
    });
    test.forEach((element) => {
      testsSearch.push(element.name);
    });
    dataDictionaryGroup.forEach((element) => {
      dictionaryGroupSearch.push(element.name);
    });
    words.forEach((element) => {
      wordsSearch.push(element.word);
    });
    dataCourses.forEach((element) => {
      courses.push(element.name);
    });
    user.forEach((element) => {
      usersSearch.push(element.login);
    });
  }
);

$(function () {
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
// {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json",
//   }}
$("#coursesAdd").click(function () {
  const fileInput = $("#coursePhoto")[0];
  const data = {
    courseName: $("#courseName").val(),
    courseDesc: $("#courseDesc").val(),
    courseLevel: $("#courseLevel").val(),
    type: "add",
  };
  const formData = new FormData();
  formData.append("photo", fileInput.files[0]);
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("coursesChange", options);
});
$("#coursesUpdate").click(function () {
  const fileInput = $("#coursePhoto")[0];
  const data = {
    courseName: $("#courseName").val(),
    courseDesc: $("#courseDesc").val(),
    courseLevel: $("#courseLevel").val(),
    courseID: courseID,
    type: "update",
  };
  const formData = new FormData();
  formData.append("photo", fileInput.files[0]);
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("coursesChange", options);
});
$("#coursesDelete").click(function () {
  const data = {
    courseID: courseID,
    type: "delete",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("coursesChange", options);
});
//тесты
$("#testAdd").click(function () {
  const data = {
    testName: $("#testName").val(),
    testDesc: $("#testDesc").val(),
    testCourse: $("#testCourse").val(),
    type: "add",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("testChange", options);
});
$("#testUpdate").click(function () {
  const data = {
    testName: $("#testName").val(),
    testDesc: $("#testDesc").val(),
    testCourse: $("#testCourse").val(),
    testId: testId,
    type: "update",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("testChange", options);
});
$("#testDelete").click(function () {
  const data = {
    testId: testId,
    type: "delete",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("testChange", options);
});
//question
$("#questionAdd").click(function () {
  const data = {
    question: $("#question").val(),
    answer: $("#answer").val(),
    inputType: $("#inputType").val(),
    outputType: $("#outputType").val(),
    testID: $("#testID").val(),
    type: "add",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("questionChange", options);
});
$("#questionUpdate").click(function () {
  const data = {
    question: $("#question").val(),
    answer: $("#answer").val(),
    inputType: $("#inputType").val(),
    outputType: $("#outputType").val(),
    testID: $("#testID").val(),
    questionId: questionId,
    type: "update",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("questionChange", options);
});
$("#questionDelete").click(function () {
  const data = {
    questionId: questionId,
    type: "delete",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("questionChange", options);
});
//video
$("#videoAdd").click(function () {
  const fileInput = $("#courseVideo")[0];
  const data = {
    videoId: $("#readMode").val(),
    description: $("#videoDesc").val(),
    testId: $("#videoTest").val(),
    type: "add",
  };
  const formData = new FormData();
  formData.append("video", fileInput.files[0]);
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("videoChange", options);
});
$("#videoUpdate").click(function () {
  const fileInput = $("#courseVideo")[0];
  const data = {
    videoId: $("#readMode").val(),
    description: $("#videoDesc").val(),
    testId: $("#videoTest").val(),
    type: "update",
  };
  const formData = new FormData();
  formData.append("video", fileInput.files[0]);
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("videoChange", options);
});
$("#videoDelete").click(function () {
  const data = {
    videoId: $("#readMode").val(),
    type: "delete",
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const options = {
    method: "POST",
    body: formData,
  };
  clickButonChange("videoChange", options);
});
function clickButonChange(url, options) {
  fetch("http://localhost:3000/" + url, options)
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


$("#linkVideo").click(function() {
  $("#promptAdmin").attr("data-bs-original-title", "Чтобы добавить видео заполните обязательные поля Test и добавте через файл видео ряд. Необязательные поля: description. Поле Link для обновление и удаление.");
});
$("#linkCourse").click(function() {
  $("#promptAdmin").attr("data-bs-original-title", "Чтобы добавить новый курс обязательно заполните поля:Name. Остальные являются необязательными. Для обновления фото курса выберите из поля Name курс и выберить через file новое фото.");
});
$("#linkTest").click(function() {
  $("#promptAdmin").attr("data-bs-original-title", "Чтобы добавить тест заполните обязательные поля course и Name. Необязательные поля: description.");
});
$("#linkQuestion").click(function() {
  $("#promptAdmin").attr("data-bs-original-title", "Чтобы добавить новый вопрос нужно: в поле Question записать либо id видео для воспроизведения, либо слово или предложение. Если это видео в поле Output выберите обязательно 'video'! Обязательно выберите test к которому будет относится вопрос!! И Запишите ответ! Для удаления достаточно выбор в поле Question нужный вопрос и нажать Delete.");
});
$("#linkRule").click(function() {
  $("#promptAdmin").attr("data-bs-original-title", "Обязательные поля: Name, text, test!");
});