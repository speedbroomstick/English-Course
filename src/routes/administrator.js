module.exports = (io) => {
    const express = require("express");
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
        res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions});
    });
  
    router.get("/getAllInformation", async (req, res) => {
      await io.emit("administrator",dataCourses,dataDictionaryGroup,words,users,tests,questions);
      res.send("Ok");
    });
    router.post("/coursesChange", async(req, res)=>{
      let name = req.body.courseName;
      let description = req.body.courseDesc;
      let level = req.body.courseLevel;
      let courseID = req.body.courseID;
      if( req.body.type == "add"){
        await courses.addCourse(name,description,level);
      }else if( req.body.type == "update"){
        await courses.updateCourse(name,description,level,courseID);
      }else{
        await courses.deleteCourse(courseID);
      }
      res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions});
    });
    router.post("/testChange", async(req, res)=>{
      let name = req.body.testName;
      let description = req.body.testDesc;
      let course = req.body.testCourse;
      let testId = req.body.testId;
      if( req.body.type == "add"){
        await courses.addTest(name,description,course);
      }else if( req.body.type == "update"){
        await courses.updateTest(name,description,course,testId);
      }else{
        await courses.deleteTest(testId);
      }
      res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions});
    });
    router.post("/questionChange", async(req, res)=>{
      let question = req.body.question;
      let answer = req.body.answer;
      let inputType = req.body.inputType;
      let outputType = req.body.outputType;
      let testID = req.body.testID;
      let questionId = req.body.questionId;
      if( req.body.type == "add"){
        await courses.addQuestion(question,answer,inputType,outputType,testID);
      }else if( req.body.type == "update"){
        await courses.updateQuestion(question,answer,inputType,outputType,testID,questionId);
      }else{
        await courses.deleteQuestion(questionId);
      }
      res.render("admin/mainPanel",{dataCourses:dataCourses,dataDictionaryGroup:dataDictionaryGroup,words:words,users:users,tests:tests,questions:questions});
    });
    return router;
  };
  