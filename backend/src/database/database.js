const { User } = require("../components/user/user.model");
const { FlashCard } = require("../components/flashcard/flashcard.model");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./db.json");

const database = {
  users: [
    new User(1, "Daniel", "admin", "email@seznam.cz"),
    new User(2, "Matej", "admin", "test@gmail.com"),
    new User(3, "Rumburak", "user", "usr@test.com"),
  ],

  flashcards: [
    new FlashCard(
      1,
      "Apple",
      "./pictures/apple.jpg",
      "ˈæp.əl",
      "./sounds/apple.mp3",
      "Fruits"
    ),
    new FlashCard(
      2,
      "Banana",
      "./pictures/banana.jpg",
      "bəˈnæn.ə",
      "./sounds/banana.mp3",
      "Fruits"
    ),
    new FlashCard(
      3,
      "Lemon",
      "./pictures/lemon.jpg",
      "ˈlem.ən",
      "./sounds/lemon.mp3",
      "Fruits"
    ),
    new FlashCard(
      4,
      "Pear",
      "./pictures/Pear.jpg",
      "peər",
      "./sounds/apple.mp3",
      "Fruits"
    ),

    new FlashCard(
      5,
      "Grapes",
      "./pictures/grapes.jpg",
      "ɡreɪps",
      "./sounds/grapes.mp3",
      "Fruits"
    ),
    new FlashCard(
      6,
      "Cherry",
      "./pictures/cherry.jpg",
      "ˈʧɛr.i",
      "./sounds/cherry.mp3",
      "Fruits"
    ),
    new FlashCard(
      7,
      "Blueberry",
      "./pictures/blueberry.jpg",
      "ˈbluːˌber.i",
      "./sounds/blueberry.mp3",
      "Fruits"
    ),
    new FlashCard(
      8,
      "Blackberry",
      "./pictures/blackberry.jpg",
      "ˈblækˌber.i",
      "./sounds/blackberry.mp3",
      "Fruits"
    ),
    new FlashCard(
      9,
      "Raspberry",
      "./pictures/raspberry.jpg",
      "ˈræzˌber.i",
      "./sounds/raspberry.mp3",
      "Fruits"
    ),

    new FlashCard(
      10,
      "Watermelon",
      "./pictures/watermelon.jpg",
      "ˈwɔː.tərˌmel.ən",
      "./sounds/watermelon.mp3",
      "Fruits"
    ),
  ],

  testResults: [],
};
saveDatabase();

function saveDatabase() {
  fs.writeFileSync(filePath, JSON.stringify(database, null, 2), "utf8");
}

function loadDatabase() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    const loadedData = JSON.parse(data);

    if (loadedData) {
      if (Array.isArray(loadedData.users)) {
        database.users = loadedData.users.map(
          (user) =>
            new User(
              user.id,
              user.name,
              user.role,
              user.email,
              user.favorites || []
            )
        );
      }
      if (Array.isArray(loadedData.flashcards)) {
        database.flashcards = loadedData.flashcards.map(
          (fc) =>
            new FlashCard(
              fc.id,
              fc.name,
              fc.picture,
              fc.pronunciation,
              fc.audio,
              fc.theme || "Unknown"
            )
        );
      }
      if (Array.isArray(loadedData.testResults)) {
        database.testResults = loadedData.testResults;
      }
    }
  } else {
    console.log("No db.json file found. Using default data");
  }
}

loadDatabase();

console.log("Final database structure:", database);
module.exports = { database, saveDatabase, loadDatabase };
