const { FlashCardDAO } = require("../flashcard/flashcard.model");
const { database, saveDatabase } = require("../../database/database");
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const answersSchema = {
  type: "object",
  properties: {
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", minimum: 1 },
          userAnswer: { type: "string" },
        },
        required: ["id", "userAnswer"],
      },
    },
  },
  required: ["answers"],
  additionalProperties: false,
};

const validate = ajv.compile(answersSchema);

const saveTestResults = (testResult) => {
  database.testResults.push(testResult);

  saveDatabase();
};

const TestService = {
  getTestQuestions: (req, res) => {
    const flashcardDao = new FlashCardDAO(database);
    const allCards = flashcardDao.listAllFlashCards();
    const testCards = allCards.sort(() => 0.5 - Math.random()).slice(0, 10);
    const questions = testCards.map((card) => ({
      id: card.id,
      picture: card.picture,
    }));

    res.send(questions);
  },

  submitAnswers: (req, res) => {
    if (!validate(req.body)) {
      return res.status(400).send({ errors: validate.errors });
    }

    const { answers } = req.body;
    const flashcardDao = new FlashCardDAO(database);
    const results = answers.map((answer) => {
      const card = flashcardDao.getFlashCard(answer.id);
      return {
        questionId: card.id,
        correctAnswer: card.name,
        userAnswer: answer.userAnswer,
        isCorrect: answer.userAnswer.toLowerCase() === card.name.toLowerCase(),
      };
    });

    const correctAnswers = results.filter(
      (results) => results.isCorrect
    ).length;
    const testResult = {
      dateTaken: new Date(),
      correctAnswers: correctAnswers,
      incorrectAnswers: answers.length - correctAnswers,
      successRate: (correctAnswers / answers.length) * 100,
      details: results,
    };

    database.testResults.push(testResult);
    saveTestResults(testResult);

    res.send({ results });
  },
};

module.exports = { TestService };
