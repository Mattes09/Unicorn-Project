const express = require("express");
const { UserService } = require("./user.service");
const { User } = require("./user.model");

const userRouter = express.Router();

userRouter.get("/:id", UserService.getUser);
userRouter.get("/", UserService.listAllUsers);
userRouter.post("/:userId/favorites", UserService.addFavorite);
userRouter.delete("/:userId/favorites", UserService.removeFavorite);
userRouter.get("/:userId/favorites", UserService.getUserFavorites);

module.exports = userRouter;
