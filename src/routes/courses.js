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
    courses = new Courses(new MySql(), new FireBase());
    let dataCourses = await courses.getCourses();
    res.render("courses/courses", { datas: dataCourses });
  });

  router.get("/courses_begin", async (req, res) => {
    const tests = await courses.getTests(req.query.Id);
    test = new Test(
      await courses.getQuestionForTests(2),
      false
    );
    video = await courses.getVideo(2);

    res.render("courses/begin_course", {
      test: tests,
      questions: test.data,
      order: test.order,
      chetQuestions: test.chetQuestions,
      video: video
    });
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
          "answer"
        ),
        test.chetQuestions,
        test.data,
        test.order,
        test.countToAdd,
        answerUser,
        video
      );
      res.send("Correct!");
    }
  );
  return router;
};
