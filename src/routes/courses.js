module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const FireBase = require("../app/FireBase");
  const MySql = require("../app/MySql");
  const Courses = require("../app/Courses");
  const ChatGPT = require("../app/ChatGPT");
  require('dotenv').config({ path: __dirname + '/../.env' });
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, 'audio.mp3') 
    }
  });
  
  const upload = multer({ storage: storage });
  router.get("/courses", async (req, res) => {
    const courses = new Courses(new MySql(),new FireBase());
    let dataCourses = await courses.getCourses();;
    res.render("courses/courses",{dataCourses:dataCourses});
  });
  router.get("/courses_begin", async (req, res) => {
    res.render("courses/begin_course");
  });
  router.post("/upload-audio", upload.single('audioStream'), async (req, res) => {
    const audioStream = req.file.path; // получаем путь к загруженному файлу
    const chatGPT = new ChatGPT(process.env.OPENAI_API_KEY); 
    console.log(await chatGPT.get(audioStream));
  });
  return router;
};
