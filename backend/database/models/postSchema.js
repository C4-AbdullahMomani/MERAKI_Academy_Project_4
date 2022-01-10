const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema(
  {
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "USer" },
    comments: { type: mongoose.Schema.Types.ObjectId, ref: "USer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
