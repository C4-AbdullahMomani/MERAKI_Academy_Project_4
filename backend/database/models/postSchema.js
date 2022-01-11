const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes:{type:Number},
    image: { type: String },
    video: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
