const express = require("express");
const { createNewConversation,getConversationByUserId } = require("../controllers/conversation");
const conversationRouter = express.Router();
conversationRouter.post("/",createNewConversation)
conversationRouter.get("/:id",getConversationByUserId)
module.exports = conversationRouter;
