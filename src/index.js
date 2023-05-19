const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const path = require("path");
const ChatGPT = require("./app/ChatGPT");

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = socketIO(server);
const usersRoutes = require("./routes/users")(io);
const dictionaryRoutes = require("./routes/dictionary")(io);
const courses = require("./routes/courses")(io);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", usersRoutes);
app.use("/", dictionaryRoutes);
app.use("/", courses);

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("main/main");
});
io.on("connection", (socket) => {
  console.log("Клиент подключился");
});

app.get("/exit", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("idUser");
  res.render("main/main");
});

