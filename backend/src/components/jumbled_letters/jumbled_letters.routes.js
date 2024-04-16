const express = require("express");
const { JumbledLettersService } = require("./jumblet_letters.service");

const jumbledLettersRouter = express.Router();

jumbledLettersRouter.get("/", JumbledLettersService.getAllCards);
jumbledLettersRouter.get(
  "/toggle/:id",
  JumbledLettersService.toggleCardVisibility
);

module.exports = jumbledLettersRouter;
