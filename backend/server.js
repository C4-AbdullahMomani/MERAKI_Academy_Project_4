const express = require("express");
const postRouter = require("./routes/posts"); //import post router
const usersRouter=require("./routes/users")
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

app.use("/posts",postRouter)
app.use("/users",usersRouter)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
