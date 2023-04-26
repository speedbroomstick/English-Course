const mysql = require("./app/MySql");
const express = require("express");
const app = express();
const port = 3000;
const Users = require("./app/Users");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const MySql = require("./app/MySql");
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Клиент подключился');
 // socket.emit('message', 'Сервер: Вы успешно подключились к серверу!');
});
/*
app.post("/login", (req, res) => {
  let userData = req.body;
  users = new Users(new MySql());
  let result = users.getUser(userData.login_l, userData.pasword_p);
  //res.cookie('username', 'john.doe', {httpOnly: true });
  io.emit('message', 'Сервер: Пользователь ' + userData.login_l + ' успешно аутентифицирован!');
  res.render("main");
}); */

// обработчик POST запроса
app.post('/login', async (req, res) => {
  users = new Users(new MySql());
  let result = await users.getUser(req.body.login, req.body.password);
  io.emit('message', result);
});

app.post("/register", (req, res) => {
  let userData = req.body;
  users = new Users(new MySql());
  users.insertUser(userData.login, userData.password);
  res.render("main");
});