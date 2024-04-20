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

    let getGameCards = allCards.slice(0, 10).map((card) => ({
      ...card,
      visible: false,
      matched: false,
    }));

    getGameCards = [...getGameCards, ...getGameCards];
    shuffleArray(getGameCards);

    res.send({ getGameCards });
  },

  checkMatch: (req, res) => {
    const validate = ajv.compile(matchSchema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).send({ erros: validate.errors });
    }
    const { id1, id2 } = req.body;
    const flashcardDao = new FlashCardDAO(database);
    const card1 = flashcardDao.getFlashCard(id1);
    const card2 = flashcardDao.getFlashCard(id2);

    if (!card1 || !card2) {
      return res.status(404).send({ error: "One or both cards not found" });
    }

    const isMatch = card1.id === card2.id;
    res.send({ isMatch });
  },
};

module.exports = { PairsService };
