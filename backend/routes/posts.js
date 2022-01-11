const express = require("express");
postRouter = express.Router();
const {
  createNewPost,
  getAllPosts,
  getAllPostsByAuthorId,
} = require("../controllers/posts");
postRouter.post("/", createNewPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAllPostsByAuthorId);
module.exports = postRouter;
