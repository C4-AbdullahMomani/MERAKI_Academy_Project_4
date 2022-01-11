const express = require("express");
postRouter = express.Router();
const { createNewPost,getAllPosts} = require("../controllers/posts");
postRouter.post("/", createNewPost)
postRouter.get("/",getAllPosts)
module.exports = postRouter;
