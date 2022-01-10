const express = require("express");
usersRouter = express.Router();

const {createNewUser,getUserByFirstName} = require("../controllers/users");
usersRouter.post("/", createNewUser);
usersRouter.get("/:firstName",getUserByFirstName)
module.exports = usersRouter;
