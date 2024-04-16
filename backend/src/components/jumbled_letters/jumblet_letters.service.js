const { JumbledLettersDAO } = require("./jumbled_letters.model");
const database = require("../../database/database");

const JumbledLettersService = {
  toggleCardVisibility: (req, res) => {
    const cardId = parseInt(req.params.id);
    const dao = new JumbledLettersDAO(database);
    const card = dao.getCardById(cardId);

    if (!card) {
      return res.status(404).send({ error: "Card not found" });
    }
    card.toggleVisibility();
    res.send({ card: card });
  },

  getAllCards: (req, res) => {
    const dao = new JumbledLettersDAO(database);
    const cards = dao.getAllCards();
    res.send({ cards: cards });
  },
};

module.exports = { JumbledLettersService };
