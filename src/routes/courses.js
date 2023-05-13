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
    res.render("courses/courses", { dataCourses: dataCourses });
  });

  router.get("/courses_begin", async (req, res) => {
    const tests = await courses.getTests(req.query.courseId);
    const questions = await courses.getQuestionForTests(req.query.courseId);
    test = new Test(
      await courses.getQuestionForTests(req.query.courseId),
      false
    );
    res.render("courses/begin_course", {
      test: tests,
      questions: test.data,
      order: test.order,
      chetQuestions: 0,
    });
  });

  router.post(
    "/upload-audio",
    upload.single("audioStream"),
    async (req, res) => {
      const audioStream = req.file.path;
      const chetQuestions = req.body.chetQuestions;
      const chatGPT = new ChatGPT(process.env.OPENAI_API_KEY);
      await io.emit(
        "answer_from_voice",
        parseInt(chetQuestions) + 1,
        test.data,
        test.order,
        await test.checkAnswer(
          await chatGPT.get(audioStream),
          chetQuestions,
          "answer"
        )
      );
      res.send("Correct!");
    }
  );
  return router;
};
