const mysql = require("./app/MySql");
const express = require("express");
const Users = require("./app/Users");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const MySql = require("./app/MySql");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/login", (req, res) => {
  const userData = req.body;
  console.log(userData);
  users = new Users(new MySql());
  users.getUser(userData.login_l, userData.pasword_p);
  res.render("main");
});

app.post("/register", (req, res) => {
  const userData = req.body;
  console.log(userData);
  users = new Users(new MySql());
  users.getUser(userData.login_l, userData.pasword_p);
  res.render("main");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
