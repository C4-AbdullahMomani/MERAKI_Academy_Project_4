const express = require("express");
const { creatNewRole } = require("../controllers/role");
const roleRouter = express.Router();
roleRouter.post("/", creatNewRole);

module.exports = roleRouter;
