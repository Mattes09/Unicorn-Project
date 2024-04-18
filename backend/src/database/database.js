const { User } = require("../components/user/user.model");
const { FlashCard } = require("../components/flashcard/flashcard.model");

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
  new FlashCard(
    2,
    "Banana",
    "./pictures/banana.jpg",
    "bəˈnæn.ə",
    "./sounds/banana.mp3"
  ),
  new FlashCard(
    3,
    "Lemon",
    "./pictures/lemon.jpg",
    "ˈlem.ən",
    "./sounds/lemon.mp3"
  ),
  new FlashCard(4, "Pear", "./pictures/Pear.jpg", "peər", "./sounds/apple.mp3"),

  new FlashCard(
    5,
    "Grapes",
    "./pictures/grapes.jpg",
    "ɡreɪps",
    "./sounds/grapes.mp3"
  ),
  new FlashCard(
    6,
    "Cherry",
    "./pictures/cherry.jpg",
    "ˈʧɛr.i",
    "./sounds/cherry.mp3"
  ),
  new FlashCard(
    7,
    "Blueberry",
    "./pictures/blueberry.jpg",
    "ˈbluːˌber.i",
    "./sounds/blueberry.mp3"
  ),
  new FlashCard(
    8,
    "Blackberry",
    "./pictures/blackberry.jpg",
    "ˈblækˌber.i",
    "./sounds/blackberry.mp3"
  ),
  new FlashCard(
    9,
    "Raspberry",
    "./pictures/raspberry.jpg",
    "ˈræzˌber.i",
    "./sounds/raspberry.mp3"
  ),

  new FlashCard(
    10,
    "Watermelon",
    "./pictures/watermelon.jpg",
    "ˈwɔː.tərˌmel.ən",
    "./sounds/watermelon.mp3"
  ),
];

const database = { users, flashcards };

module.exports = database;
