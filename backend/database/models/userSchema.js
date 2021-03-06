const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  image: { type: String },
  followers: [{ type: String }],
  following: [{ type: String }],
  email: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.passWord = await bcrypt.hash(this.passWord, 10);
});
module.exports = mongoose.model("User", userSchema);
