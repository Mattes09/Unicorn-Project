const userService = require("./user.service");
const express = require("express");
const UserService = require("./user.service");

const userRouter = express.Router();

userRouter.get("/:id", UserService.getUser);

module.exports = userRouter;
