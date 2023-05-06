module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const FireBase = require("../app/FireBase");

  router.get("/courses", async (req, res) => {
    const fire = new FireBase();
    let url = await fire.getPictureUrl("gs://english-course-18e54.appspot.com/big-ben.jpg");
    console.log(url);
    res.render("courses/courses");
  });

  return router;
};
