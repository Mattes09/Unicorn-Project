const database = require("../../database/database");
const { FlashCardDAO } = require("./flashcard.model");

const FlashcardService = {
  getFlashcard: (req, res) => {
    const flashcardId = req.params.id;
    const flashcardDao = new FlashCardDAO(database);
    const flashcard = flashcardDao.getFlashCard(flashcardId);
    console.log(flashcard);
    if (!flashcard) {
      return res.status(404).send({ error: "Flashcard not found" });
    }
    res.send(flashcard);
  },

  listAllFlashcards: (req, res) => {
    const flashcardDao = new FlashCardDAO(database);
    const flashcards = flashcardDao.listAllFlashCards();
    res.send(flashcards);
  },
};

module.exports = { FlashcardService };
