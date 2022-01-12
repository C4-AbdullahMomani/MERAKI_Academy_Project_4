const express = require("express");
usersRouter = express.Router();

const {
  createNewUser,
  getUserByFirstName,
  getUserByUserId,
  getAllUsers,
  updateUserFollowing,
} = require("../controllers/users");
const authentication = require("../middleware/authentication");
usersRouter.post("/", createNewUser);
usersRouter.get("/search/:id", getUserByUserId);
usersRouter.get("/:firstName", getUserByFirstName);
usersRouter.get("/", getAllUsers);
usersRouter.put("/:id/following", updateUserFollowing);
module.exports = usersRouter;
