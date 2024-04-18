const express = require("express");
const { MultipleChoiceService } = require("./multiple_choice.service");

const multipleChoiceRouter = express.Router();

multipleChoiceRouter.get("/question", MultipleChoiceService.getQuestion);

module.exports = multipleChoiceRouter;
