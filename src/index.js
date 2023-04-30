const mysql = require("./app/MySql");
const Words = require("./app/Words");
const express = require("express");
const app = express();
const port = 3000;
const Users = require("./app/Users");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const MySql = require("./app/MySql");
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const Joi = require('joi');
const path = require('path');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set("view engine", "ejs");

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(10)
    .max(24)
    .required(),
  password: Joi.string()
    .alphanum()
    .required()
    .min(10)
    .max(24)
});
app.get("/", (req, res) => {
  res.render("main");
});
app.get("/word_training", async (req, res) => {
  words = new Words(new MySql());
  allWords = await words.getAllWords();
  const numbers = new Set();
  let max = allWords.length;
  while (numbers.size < max) {
    const randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    numbers.add(randomNumber);
  }
  let order = Array.from(numbers);
  console.log(order);
  res.render("word_training");
});
app.get("/dictionary", async (req, res) => {
  const ofset = (req.query.page-1 || 0)*10;
  words = new Words(new MySql());
  result = await words.getWords(2,ofset,10);
  allWords = await words.getAllWordsGroup(2);
  let count = allWords.length;
  if(count % 10 == 0){
    count /= 10;
  }else{
    count /= 10;
    count++;
    count = parseInt(count);
  }
  res.render("dictionary", { words: result, count:count });
});
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Клиент подключился');
});
app.post('/login', async (req, res) => {
  users = new Users(new MySql());
  const data = {
    username: req.body.login,
    password: req.body.password
  };
  const { error, value } = schema.validate(data);
  if (error) {
    io.emit('authorization', error.message);
  } else {
    let result = await users.getUser(value.username, value.password);
    if(result == true){
      res.cookie('username', value.username);
      }
    io.emit('authorization', result);
    res.send('Cookie is set');
  }
});

app.post("/register", async (req, res) => {
  users = new Users(new MySql());
  const data = {
    username: req.body.login,
    password: req.body.password
  };
  const { error, value } = schema.validate(data);
  if (error) {
    io.emit('authorization', error.message);
  } else {
    let result = await users.insertUser(value.username, value.password);
    io.emit('authorization', result);
  }
});
/*app.get("/dictionary", async (req, res) => {
  words = new Words(new MySql());
  result = await words.getWords(1);
  res.render("dictionary", { words: result });
});*/