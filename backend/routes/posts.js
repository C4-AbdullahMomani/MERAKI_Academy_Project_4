const express = require("express");
postRouter = express.Router();
const { createNewPost} = require("../controllers/posts");
postRouter.post("/", createNewPost)
module.exports = postRouter;
