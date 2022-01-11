const express = require("express");
usersRouter = express.Router();

const {
  createNewUser,
  getUserByFirstName,
  getUserByUserId,
} = require("../controllers/users");
const authentication = require("../middleware/authentication");
usersRouter.post("/", createNewUser);
usersRouter.get("/search/:id", getUserByUserId);
usersRouter.get("/:firstName", getUserByFirstName);
module.exports = usersRouter;
