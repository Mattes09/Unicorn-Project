const { database } = require("../../database/database");
const { FlashCardDAO } = require("./flashcard.model");

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const getFlashCardSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
  },
  required: ["id"],
  additionalProperties: false,
};

const FlashcardService = {
  getFlashCardsByTheme: (req, res) => {
    const theme = req.params.theme;
    const flashcardDao = new FlashCardDAO(database);
    const flashcards = flashcardDao.getFlashCardByTheme(theme);

    if (flashcards.length === 0) {
      return res
        .status(404)
        .send({ error: "No flashcards found for this theme" });
    }

    res.send(flashcards);
  },

  getFlashcard: (req, res) => {
    const validate = ajv.compile(getFlashCardSchema);
    const valid = validate({ id: parseInt(req.params.id) });

    if (!valid) {
      return res.status(400).send({ errors: validate.errors });
    }

    const flashcardId = parseInt(req.params.id);
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
