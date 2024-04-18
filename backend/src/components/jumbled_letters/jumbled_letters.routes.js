const express = require("express");
const { JumbledLettersService } = require("./jubmled_letters.service");

jumbledLettersRouter = express.Router();

jumbledLettersRouter.get("/card", JumbledLettersService.getCard);
jumbledLettersRouter.post("/check-answer", JumbledLettersService.checkAnswer);

module.exports = jumbledLettersRouter;
