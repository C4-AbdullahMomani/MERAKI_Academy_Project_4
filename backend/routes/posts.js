const express = require("express");
postRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  getAllPostsByAuthorId,
  updatePostByAuthorId,
  deletePostById,
  createNewComment
} = require("../controllers/posts");
const { post } = require("./conversation");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
postRouter.post("/",authentication, createNewPost);
postRouter.get("/",authentication, getAllPosts);
postRouter.get("/:id",authentication, getAllPostsByAuthorId);
postRouter.put("/:id", updatePostByAuthorId);
postRouter.delete("/:id", deletePostById);
postRouter.post("/:id/comments",authentication,
authorization("CREATE_COMMENTS"),createNewComment)
module.exports = postRouter;
