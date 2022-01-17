const express = require("express");
const { createNewConversation,getConversationByUserId ,getConversationByTowId} = require("../controllers/conversation");
const conversationRouter = express.Router();
conversationRouter.post("/",createNewConversation)
conversationRouter.get("/:id",getConversationByUserId)
conversationRouter.get("/search/:firstId/:secondId",getConversationByTowId)
module.exports = conversationRouter;
