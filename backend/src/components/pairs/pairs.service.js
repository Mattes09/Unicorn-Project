const { FlashCard, FlashCardDAO } = require("../flashcard/flashcard.model");
const { database } = require("../../database/database");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const matchSchema = {
  type: "object",
  properties: {
    id1: { type: "integer", minimum: 1 },
    id2: { type: "integer", minimum: 1 },
  },
  required: ["id1", "id2"],
  additionalProperties: false,
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const PairsService = {
  getGameCards: (req, res) => {
    const flashcardDao = new FlashCardDAO(database);
    const allCards = flashcardDao.listAllFlashCards();
    shuffleArray(allCards);

    // Select only 10 unique cards and create two variants for each: one as an image, one as a word.
    let selectedCards = allCards.slice(0, 10);
    let getGameCards = selectedCards.flatMap((card) => [
      {
        ...card,
        type: "image",
        matched: false,
        visible: false,
        content: card.picture.toLowerCase(),
      },
      {
        ...card,
        type: "word",
        matched: false,
        visible: false,
        content: card.name,
      },
    ]);

    shuffleArray(getGameCards); // Shuffle to mix words and images
    res.send({ getGameCards });
  },

  checkMatch: (req, res) => {
    const validate = ajv.compile(matchSchema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).send({ errors: validate.errors });
    }
    const { id1, id2 } = req.body;
    const card1 = database.flashcards.find((card) => card.id === id1);
    const card2 = database.flashcards.find((card) => card.id === id2);

    // Match is valid if names of the cards (content) are the same
    const isMatch = card1.name === card2.name;
    res.send({ isMatch });
  },
};

module.exports = { PairsService };
