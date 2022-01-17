const postsSchema = require("../database/models/postSchema");
const userModel = require("../database/models/userSchema");
const commentModel = require("../database/models/commentSchema");
// this function to create new post
const createNewPost = (req, res) => {
  const { description, image, video, comments } = req.body;
  const newPost = new postsSchema({
    author: req.token.userId,
    description,
    image,
    video,
    comments,
    likes: 0,
  });
  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        success: true,
        message: `Post Created successfully`,
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//this function to get all post
const getAllPosts = (req, res) => {
  // const userId = req.token.userId;
  // userId: userId,
  postsSchema
    .find({}).sort({'createdAt': -1})
    .populate("author")
    .populate({ path: "comments", populate: "commenter" })
    .then((posts) => {
      if (posts.length) {
        res.status(200).json({
          success: true,
          message: `All the posts`,

          posts: posts,
          comments: posts.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Posts Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// this function get the post by AuthorId
const getAllPostsByAuthorId = (req, res) => {
  let authorId = req.params.id;
  postsSchema
    .find({ author: authorId })
    .populate("author", "firstName lastName")
    .then((posts) => {
      if (posts.length) {
        res.status(200).json({
          success: true,
          message: `All the posts By This User`,

          posts: posts,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Posts Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

// this function to update post by author Id

const updatePostByAuthorId = (req, res) => {
  // userId = req.params.id;

  const { description, image, video } = req.body;
  postsSchema
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { description, image, video } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `No Posts Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Post Updated successfully`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//this post delete the post by it id
const deletePostById = (req, res) => {
  const postId = req.params.id;
  postsSchema
    .findByIdAndDelete({ _id: postId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Post Not Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete Post with id: ${postId}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//this function to create new comment
const createNewComment = (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const newComment = new commentModel({ comment, commenter: req.token.userId });
  newComment
    .save()

    .then((result) => {
      postsSchema
        .updateOne({ _id: postId }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The new comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//this function to update the likes number ////=>(send in req.body the old number added to 1)
const updatePostLikes = (req, res) => {
  const postId = req.params.id;

  postsSchema
    .findOneAndUpdate(
      { _id: postId },
      { $set: { likes: req.body.likes } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `No Posts Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Post Updated successfully`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  createNewPost,
  getAllPosts,
  getAllPostsByAuthorId,
  updatePostByAuthorId,
  deletePostById,
  createNewComment,
  updatePostLikes,
};
