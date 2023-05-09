module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const FireBase = require("../app/FireBase");
  const MySql = require("../app/MySql");
  const Courses = require("../app/Courses");

  router.get("/courses", async (req, res) => {
    const courses = new Courses(new MySql(),new FireBase());
    let dataCourses = await courses.getCourses();;
    res.render("courses/courses",{dataCourses:dataCourses});
  });
  router.get("/courses_begin", async (req, res) => {
    res.render("courses/begin_course");
  });
  return router;
};
