const express = require("express");
const postRouter = require("./routes/posts"); //import post router
const usersRouter = require("./routes/users"); //import users router
const loginRouter = require("./routes/login"); //import login router
const roleRouter = require("./routes/role"); //import role router
const conversationRouter = require("./routes/conversation");
const messageRouter=require("./routes/messages")
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
