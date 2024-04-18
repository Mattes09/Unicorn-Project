const { FlashCardDAO } = require("../flashcard/flashcard.model");
const database = require("../../database/database");

const MultipleChoiceService = {
  getQuestion: (req, resp) => {
    const flashcardDao = new FlashCardDAO(database);
    const allCards = flashcardDao.listAllFlashCards();
    const getQuestionIndex = Math.floor(Math.random() * allCards.length);
    const questionCard = allCards[getQuestionIndex];

    const choices = allCards
      .filter((card) => card.id !== questionCard.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((card) => card.name);

    choices.push(questionCard.name);
    choices.sort(() => 0.5 - Math.random());

    resp.send({
      picture: questionCard.picture,
      choices: choices,
      correctAnswer: questionCard.name,
    });
  },
};

module.exports = { MultipleChoiceService };
