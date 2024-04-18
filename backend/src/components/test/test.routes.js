const express = require("express");
const { TestService } = require("./test.service");

const testRouter = express.Router();

testRouter.get("/questions", TestService.getTestQuestions);
testRouter.post("/submit", TestService.submitAnswers);

module.exports = testRouter;
