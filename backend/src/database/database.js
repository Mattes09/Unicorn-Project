const { User } = require("../components/user/user.model");
const { FlashCard } = require("../components/flashcard/flashcard.model");
const {
  JumbledLetterCard,
} = require("../components/jumbled_letters/jumbled_letters.model");

const users = [
  new User(1, "Daniel", "admin", "email@seznam.cz"),
  new User(2, "Matej", "admin", "test@gmail.com"),
  new User(3, "Rumburak", "user", "usr@test.com"),
];

const flashcards = [
  new FlashCard(
    1,
    "Apple",
    "./pictures/apple.jpg",
    "ˈæp.əl",
    "./sounds/apple.mp3"
  ),
];

const jumbledLetters = [
  new JumbledLetterCard(1, "../pictures/apple.jpg"),
  new JumbledLetterCard(2, "../pictures/banana.jpg"),
];

const database = { users, flashcards, jumbledLetters };

module.exports = database;
