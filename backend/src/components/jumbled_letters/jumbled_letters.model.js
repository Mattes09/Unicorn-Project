class JumbledLetterCard {
  constructor(id, picture, word) {
    this.id = id;
    this.picture = picture;
    this.word = word;
    this.isVisible = false; // Initially, cards are face down
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  showWordOnly() {
    return this.isVisible ? this.word : null;
  }

  showPictureOnly() {
    return this.isVisible ? this.picture : null;
  }
}

class JumbledLettersDAO {
  constructor(database) {
    this.database = database;
  }

  getCardById(id) {
    return this.database.jumbledLetters.find((card) => card.id === id);
  }

  getAllCards() {
    return this.database.jumbledLetters;
  }
}

module.exports = { JumbledLetterCard, JumbledLettersDAO };
