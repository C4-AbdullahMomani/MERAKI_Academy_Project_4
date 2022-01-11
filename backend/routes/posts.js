const express = require("express");
postRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  getAllPostsByAuthorId,
  updatePostByAuthorId,
  deletePostById,
} = require("../controllers/posts");
const { post } = require("./conversation");
postRouter.post("/", createNewPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAllPostsByAuthorId);
postRouter.put("/:id", updatePostByAuthorId);
postRouter.delete("/:id", deletePostById);
module.exports = postRouter;
