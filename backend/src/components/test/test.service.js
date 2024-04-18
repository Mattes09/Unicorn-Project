const { FlashCardDAO } = require("../flashcard/flashcard.model");
const database = require("../../database/database");
const fs = require("fs");
const path = require("path");

const saveTestResults = (testResult) => {
  const filePath = path.join(__dirname, "../../database/testResults.json");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return;
    }
    const results = JSON.parse(data);
    results.push(testResult);
    fs.writeFile(filePath, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error("Error writing file", err);
        return;
      }
      console.log("Test result saved.");
    });
  });
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
