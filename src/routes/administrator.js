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
    let rule;
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
        rule = await courses.getAllRule();
        res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions,video:video,rule:rule});
    });
  
    router.get("/getAllInformation", async (req, res) => {
      await io.emit("administrator",dataCourses,dataDictionaryGroup,words,users,tests,questions,video,rule);
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

    router.post('/groupChange', upload.single('photo'), async (req, res) => {
      let data = JSON.parse(req.body.data);
      let groupName = data.groupName;
      let groupDesc = data.groupDesc;
      let idGroup = data.idGroup;
      if( data.type == "add"){
        if(req.file === undefined){
          await courses.addGroupWithoutFoto(groupName,groupDesc);
        }else{
        await courses.addGroup(groupName,groupDesc,idGroup,req.file);
        }
      }else if(data.type == "update"){
        if(req.file === undefined){
          await courses.updateGroupWithoutFoto(groupName,groupDesc,idGroup);
        }
        else{
          await courses.updateGroup(groupName,groupDesc,idGroup,req.file);
        }
      }else{
        await courses.deleteGroup(idGroup);
      }
      res.sendStatus(200);
    });
    router.post("/wordChange", upload.none() ,async(req, res)=>{
      let data = JSON.parse(req.body.data);
      let word = data.word;
      let translation = data.translation;
      let wordTest = data.wordTest;
      let example = data.example;
      let idWords = data.idWords;
      dataDictionaryGroup.forEach(element => {
        if(element.name == wordTest){
          wordTest = element.idGroup;
        }
      });
      if( data.type == "add"){
        await courses.addWord(word,translation,wordTest,example);
      }else if( data.type == "update"){
        await courses.updateWord(word,translation,wordTest,example,idWords);
      }else{
        await courses.deleteWord(idWords);
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
      if( data.type == "add"){
        await courses.addVideo(description,testId,req.file);
      }else if( data.type == "update"){
        await courses.updateVideo(description,testId,videoID,req.file);
      }else{
        await courses.deleteVideo(videoID);
      }
      res.sendStatus(200);
    });
    router.post("/ruleChange", upload.none(), async(req, res)=>{
      let data = JSON.parse(req.body.data);
      console.log(data);
      let ruleTitle = data.ruleTitle;
      let ruleName = data.ruleName;
      let ruleText = data.ruleText;
      let ruleID = data.ruleID;
      let testID = data.ruleTest;
      tests.forEach(element => {
        if(element.name == testID){
          testID = element.idtest;
        }
      });
      if( data.type == "add"){
        await courses.addRule(ruleTitle,ruleName,ruleText,testID);
      }else if( data.type == "update"){
        await courses.updateRule(ruleTitle,ruleName,ruleText,testID,ruleID);
      }else{
        await courses.deleteRule(ruleID);
      }
      res.sendStatus(200);
    });
    return router;
  };
  