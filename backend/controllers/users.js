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

module.exports = { createNewUser, getUserByFirstName };
