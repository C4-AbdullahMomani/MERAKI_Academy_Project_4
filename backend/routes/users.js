const express = require("express");
usersRouter = express.Router();

const {createNewUser} = require("../controllers/users");
usersRouter.post("/", createNewUser);
module.exports = usersRouter;
