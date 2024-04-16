class FlashCard {
  constructor(id, name, picture, pronunciation, audio) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.pronunciation = pronunciation;
    this.audio = audio;
  }
}

class FlashCardDAO {
  constructor(databaseConnection) {
    this.database = databaseConnection;
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
