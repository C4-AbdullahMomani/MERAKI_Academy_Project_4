const express = require("express");
const { createNewMessage } = require("../controllers/messages");
const messageRouter = express.Router();
messageRouter.post("/",createNewMessage)

module.exports = messageRouter;
