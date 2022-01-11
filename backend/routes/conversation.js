const express = require("express");
const { createNewConversation } = require("../controllers/conversation");
const conversationRouter = express.Router();
conversationRouter.post("/",createNewConversation)

module.exports = conversationRouter;
