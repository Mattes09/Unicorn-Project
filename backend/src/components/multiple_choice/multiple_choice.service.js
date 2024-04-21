const { FlashCardDAO } = require("../flashcard/flashcard.model");
const { database } = require("../../database/database");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const choiceSchema = {
  type: "object",
  properties: {
    questionId: { type: "integer", minimum: 1 },
    chosenAnswer: { type: "string" },
  },
  required: ["questionId", "chosenAnswer"],
  additionalProperties: false,
};

const validate = ajv.compile(choiceSchema);

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
      id: questionCard.id,
      picture: questionCard.picture,
      choices: choices,
    });
  },

  submitAnswer: (req, resp) => {
    const valid = validate(req.body);
    if (!valid) {
      return resp.status(400).send({ errors: validate.errors });
    }

    const { questionId, chosenAnswer } = req.body;
    const flashcardDao = new FlashCardDAO(database);
    const questionCard = flashcardDao.getFlashCard(questionId);

    if (!questionCard) {
      return resp.status(404).send({ error: "Question not found" });
    }

    const isCorrect = chosenAnswer === questionCard.name;
    resp.send({ isCorrect });
  },
};

module.exports = { MultipleChoiceService };
