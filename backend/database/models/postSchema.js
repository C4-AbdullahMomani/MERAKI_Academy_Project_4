const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema(
  {
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    image: { type: String },
    video: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
