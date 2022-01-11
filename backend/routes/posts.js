const express = require("express");
postRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  getAllPostsByAuthorId,
  updatePostByAuthorId
} = require("../controllers/posts");
postRouter.post("/", createNewPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAllPostsByAuthorId);
postRouter.put("/:id",updatePostByAuthorId)
module.exports = postRouter;
