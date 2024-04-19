const { FlashCardDAO } = require("../flashcard/flashcard.model");
const database = require("../../database/database");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const answerSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
    userAnswer: { type: "string", minLength: 1 },
  },
  required: ["id", "userAnswer"],
  additionalProperties: false,
};

function scrambleWord(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  return letters.join("");
}

const JumbledLettersService = {
  getCard: (req, res) => {
    const flashcardDao = new FlashCardDAO(database);
    const allCards = flashcardDao.listAllFlashCards();
    const randomIndex = Math.floor(Math.random() * allCards.length);
    const card = allCards[randomIndex];

    const scrambledWord = scrambleWord(card.name);
    res.send({
      id: card.id,
      picture: card.picture,
      scrambleWord: scrambledWord,
    });
  },

  checkAnswer: (req, res) => {
    const validate = ajv.compile(answerSchema);
    const valid = validate(req.body);

    if (!valid) {
      return res.status(400).send({ errors: validate.errors });
    }

    const { id, userAnswer } = req.body;
    const flashcardDao = new FlashCardDAO(database);
    const card = flashcardDao.getFlashCard(id);

    if (!card) {
      return res.status(404).send({ error: "Card not found" });
    }

    const isCorrect = userAnswer.toLowerCase() === card.name.toLowerCase();
    res.send({ isCorrect });
  },
};

module.exports = { JumbledLettersService };
