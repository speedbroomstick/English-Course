module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const Users = require("../app/Users");
  const MySql = require("../app/MySql");
  const Joi = require("joi");
  const schema = Joi.object({
    username: Joi.string().alphanum().min(10).max(24).required(),
    password: Joi.string().alphanum().required().min(10).max(24),
  });

  router.post("/login", async (req, res) => {
    users = new Users(new MySql());
    const data = {
      username: req.body.login,
      password: req.body.password,
    };
    const { error, value } = schema.validate(data);
    if (error) {
      io.emit("authorization", error.message);
    } else {
      let result = await users.getUser(value.username, value.password);
      if (result == true) {
        res.cookie("username", value.username);
      }
      io.emit("authorization", result);
      res.send("Cookie is set");
    }
  });

  router.post("/register", async (req, res) => {
    users = new Users(new MySql());
    const data = {
      username: req.body.login,
      password: req.body.password,
    };
    const { error, value } = schema.validate(data);
    if (error) {
      io.emit("authorization", error.message);
    } else {
      let result = await users.insertUser(value.username, value.password);
      io.emit("authorization", result);
    }
  });

  return router;
};
