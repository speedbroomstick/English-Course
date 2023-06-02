module.exports = (io) => {
    const express = require("express");
    const multer = require('multer');
    const upload = multer();
    const router = express.Router();
    const FireBase = require("../app/FireBase");
    const MySql = require("../app/MySql");
    const Courses = require("../app/Courses");
    const Users = require("../app/Users");
    const Words = require("../app/Words");
    const DictionaryGroup = require("../app/DictionaryGroup");
    const Joi = require("joi");
    const schema = Joi.object({
      username: Joi.string().alphanum().min(10).max(24).required(),
      password: Joi.string().alphanum().required().min(10).max(24),
    });
    let courses;
    let dataCourses;
    let dataDictionaryGroup;
    let words;
    let users;
    let tests;
    let questions;
    let video;
    router.get("/show_panel_admin", async (req, res) => {
        courses = new Courses(new MySql(), new FireBase());
        dataCourses = await courses.getCourses();
        tests = await courses.getAllTests();
        questions = await courses.getAllQuestionForTests();
        let word = new Words(new MySql());
        words = await word.getAllWords();
        let groups = new DictionaryGroup(new MySql(), new FireBase());
        dataDictionaryGroup = await groups.getGroup();
        user = new Users(new MySql());
        users = await user.getAllUser();
        video = await courses.getAllVideo();
        res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions,video:video});
    });
  
    router.get("/getAllInformation", async (req, res) => {
      await io.emit("administrator",dataCourses,dataDictionaryGroup,words,users,tests,questions,video);
      res.send("Ok");
    });

    router.post('/coursesChange', upload.single('photo'), async (req, res) => {
      let data = JSON.parse(req.body.data);
      let name = data.courseName;
      let description = data.courseDesc;
      let level = data.courseLevel;
      let courseID = data.courseID;
      if( data.type == "add"){
        if(req.file === undefined){
          await courses.addCourseWithoutFoto(name,description,level);
        }else{
        await courses.addCourse(name,description,level,req.file);
        }
      }else if(data.type == "update"){
        if(req.file === undefined){
          await courses.updateCourseWithoutFoto(name,description,level,courseID);
        }
        else{
          await courses.updateCourse(name,description,level,courseID,req.file);
        }
      }else{
        await courses.deleteCourse(courseID);
      }
      res.sendStatus(200);
    });


    router.post("/testChange", upload.none() ,async(req, res)=>{
      let data = JSON.parse(req.body.data);
      let name = data.testName;
      let description = data.testDesc;
      let course = data.testCourse;
      let testId = data.testId;
      if( data.type == "add"){
        await courses.addTest(name,description,course);
      }else if( data.type == "update"){
        await courses.updateTest(name,description,course,testId);
      }else{
        await courses.deleteTest(testId);
      }
      res.sendStatus(200);
    });
    router.post("/questionChange",upload.none() , async(req, res)=>{
      let data = JSON.parse(req.body.data);
      let question = data.question;
      let answer = data.answer;
      let inputType = data.inputType;
      let outputType = data.outputType;
      let testID = data.testID;
      let questionId = data.questionId;
      if( data.type == "add"){
        await courses.addQuestion(question,answer,inputType,outputType,testID);
      }else if( data.type == "update"){
        await courses.updateQuestion(question,answer,inputType,outputType,testID,questionId);
      }else{
        await courses.deleteQuestion(questionId);
      }
      res.sendStatus(200);
    });
    router.post("/videoChange", upload.single('video') , async(req, res)=>{
      let data = JSON.parse(req.body.data);
      let videoID = data.videoId;
      let description = data.description;
      let testId = data.testId;
      tests.forEach(element => {
        if(element.name == testId){
          testId = element.idtest;
        }
      });
      console.log(data);
      if( data.type == "add"){
        await courses.addVideo(description,testId,req.file);
      }else if( data.type == "update"){
        await courses.updateVideo(description,testId,videoID,req.file);
      }else{
        await courses.deleteVideo(videoID);
      }
      res.sendStatus(200);

    });
    return router;
  };
  