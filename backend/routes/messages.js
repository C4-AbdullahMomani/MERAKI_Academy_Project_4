const express = require("express");
const { createNewMessage,getAllMessages } = require("../controllers/messages");
const messageRouter = express.Router();
messageRouter.post("/",createNewMessage)
messageRouter.get("/:conversationId",getAllMessages)

module.exports = messageRouter;
