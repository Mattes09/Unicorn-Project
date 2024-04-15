const express = require("express");
const { UserService, listUsers } = require("./user.service");

const userRouter = express.Router();

userRouter.get("/:id", UserService.getUser);
userRouter.get("/", listUsers);

module.exports = userRouter;
