module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const FireBase = require("../app/FireBase");
  const MySql = require("../app/MySql");
  const Courses = require("../app/Courses");
  const ChatGPT = require("../app/ChatGPT");
  const Test = require("../app/Test");
  let courses;
  let test;
  let video;
  let progresCourses;
  let dataCourses;
  let selectCourse;
  let tests;
  let rule;
  require("dotenv").config({ path: __dirname + "/../.env" });
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      cb(null, "audio.mp3");
    },
  });

  const upload = multer({ storage: storage });

  router.get("/courses", async (req, res) => {
    if(req.cookies.username !== undefined){
    courses = new Courses(new MySql(), new FireBase());
    dataCourses = await courses.getCourses();
    progresCourses = await courses.getProgres(req.cookies.idUser);
    res.render("courses/courses", { datas: dataCourses,progresCourses:progresCourses });
    }
    else{res.render("main/main",{info:"Доступ к этому разделу доступен только авторизованным пользователям!"});}
  });

  router.get("/courses_begin", async (req, res) => {
    if(req.query.progres >= 100){
      res.render("main/main",{info:"Этот курс уже завершен, выберите другой из предложенных!"});
    }
    selectCourse = req.query.Id-1;
    tests = await courses.getTests(req.query.Id);
    let numberTest = progresCourses[req.query.Id-1].procent*tests.length/100;
    test = new Test(
      await courses.getQuestionForTests(tests[numberTest].idtest),
      false
    );
    video = await courses.getVideo(tests[numberTest].idtest);
    rule = await courses.getRule(tests[numberTest].idtest);
    res.render("courses/begin_course", {
      test: tests,
      questions: test.data,
      order: test.order,
      chetQuestions: test.chetQuestions,
      video: video,
      rule: rule,
    });
  });
  router.post("/send_agree", async(req, res)=>{
    await io.emit(
      "answer_from_voice",
      await test.checkAnswer(
        "",
        "answer",
        "text"
      ),
      test.chetQuestions,
      test.data,
      test.order,
      test.countToAdd,
      "",
      video,
      rule,
    );
    res.send("Correct!");
  });
  router.post(
    "/upload-audio",
    upload.single("audioStream"),
    async (req, res) => {
      const audioStream = req.file.path;
      const chatGPT = new ChatGPT(process.env.OPENAI_API_KEY);
      const answerUser = await chatGPT.get(audioStream);
      await io.emit(
        "answer_from_voice",
        await test.checkAnswer(
          answerUser,
          "answer",
          "audio"
        ),
        test.chetQuestions,
        test.data,
        test.order,
        test.countToAdd,
        answerUser,
        video,
        rule,

      );
      res.send("Correct!");
    }
  );
  router.get("/courses_end", async (req, res) => {
    progresCourses[selectCourse].procent +=  1/tests.length*100;
    courses.changeProcent(progresCourses[selectCourse].procent, req.cookies.idUser, selectCourse+1);
    res.render("courses/courses", { datas: dataCourses,progresCourses:progresCourses });
  });


  
  router.get("/getAllInformationCourse", async (req, res) => {
    await io.emit("info_course",test.data[test.order[0]].type_oi, test.data, test.order, test.chetQuestions, video, rule);
    res.send("Ok");
  });

  return router;
};
