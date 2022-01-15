const userModel = require("../database/models/userSchema");
const roleModel = require("../database/models/roleSchema");

const createNewUser = (req, res) => {
  const {
    firstName,
    lastName,
    age,
    email,
    country,
    passWord,
    image,
    followers,
    following,
    role,
  } = req.body;

  const newUser = new userModel({
    firstName,
    lastName,
    age,
    email,
    country,
    passWord,
    image,
    followers,
    following,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Success user Added`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getUserByFirstName = (req, res) => {
  const firstName = req.params.firstName;
  console.log(firstName);
  userModel
    .find({ firstName: firstName })
    .populate("role")
    .then((result) => {
      if (result.length) {
        console.log(result);
        res.status(200).json({
          success: true,

          user: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No User with this name`,
        });
      }
    })
    .catch((err) => {
      res.json(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

//this function get user by user id
const getUserByUserId = (req, res) => {
  const userId = req.params.id;

  userModel
    .findById({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `The User Not Found`,
        });
      }
      res.status(200).json({
        success: true,

        user: user,
      });
    })
    .catch((err) => {
      res.json(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

//this function get all users
const getAllUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => {
      if (!users) {
        res.status(200).json({
          success: true,
          message: "No Users Yet",
        });
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      res.json(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

//this function update the user followers
const updateUserFollowing = (req, res) => {
  userId = req.params.id;
  userModel
    .findOneAndUpdate(
      { _id: userId },
      { $push: { following: req.body.follower } },
      { new: true }
    )
    .then((user) => {
      if (!user) {
        res.status(202).json({
          success: true,
          message: "No Users Yet",
        });
      }
      res
        .status(202)
        .json({ success: true, message: "updated success", user: user });
    })
    .catch((err) => {
      res.json(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
module.exports = {
  createNewUser,
  getUserByFirstName,
  getUserByUserId,
  getAllUsers,
  updateUserFollowing,
};
