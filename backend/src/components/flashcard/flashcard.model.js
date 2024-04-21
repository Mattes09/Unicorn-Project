class FlashCard {
  constructor(id, name, picture, pronunciation, audio, theme) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.pronunciation = pronunciation;
    this.audio = audio;
    this.theme = theme;
    this.visible = false;
    this.matched = false;
  }
}

class FlashCardDAO {
  constructor(databaseConnection) {
    this.database = databaseConnection;
  }

  getFlashCardByTheme(theme) {
    return this.database.flashcards.filter((fc) => fc.theme === theme);
  }

  getFlashCard(id) {
    const flashcard = this.database.flashcards.find(
      (flashcard) => flashcard.id == id
    );
    return flashcard;
  }

  listAllFlashCards() {
    return this.database.flashcards;
  }

  createFlashcard(flashcardData) {
    const newFlashCard = new FlashCard(...Object.values(flashcardData));
    this.database.flashcards.push(newFlashCard);
    return newFlashCard;
  }
}

module.exports = { FlashCard, FlashCardDAO };
