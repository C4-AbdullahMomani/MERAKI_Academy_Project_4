const express = require("express");
usersRouter = express.Router();

const {createNewUser,getUserByFirstName} = require("../controllers/users");
const authentication=require("../middleware/authentication")
usersRouter.post("/", createNewUser);
usersRouter.get("/:firstName",getUserByFirstName)
module.exports = usersRouter;
