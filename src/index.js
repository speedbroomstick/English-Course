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

app.post("/login", (req, res) => {
  let userData = req.body;
  users = new Users(new MySql());
  users.getUser(userData.login_l, userData.pasword_p);
  res.cookie('username', 'john.doe', {httpOnly: true });
  res.render("main");
});

app.post("/register", (req, res) => {
  let userData = req.body;
  users = new Users(new MySql());
  users.insertUser(userData.login, userData.password);
  res.render("main");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Клиент подключился');

  // Обработка события 'message' от клиента
  socket.on('message', (data) => {
    console.log('Получено сообщение:', data);

    // Отправка сообщения обратно клиенту
    socket.emit('message', `Сервер: Привет, вы отправили: ${data}`);
  });

  // Обработка события 'disconnect' при отключении клиента
  socket.on('disconnect', () => {
    console.log('Клиент отключился');
  });
});