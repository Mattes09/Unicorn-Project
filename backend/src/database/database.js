const { User } = require("../components/user/user.model");
const { FlashCard } = require("../components/flashcard/flashcard.model");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./db.json");

const database = {
  users: [],
  flashcards: [],
  testResults: [],
};
loadDatabase();
console.log(database);

function saveDatabase() {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          users: database.users,
          flashcards: database.flashcards,
          testResults: database.testResults,
        },
        null,
        2
      ),
      "utf8"
    );
    console.log("Database saved successfully");
  } catch (error) {
    console.error("Error saving the database:", error);
  }
}

function loadDatabase() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    const loadedData = JSON.parse(data);

    if (loadedData) {
      if (Array.isArray(loadedData.users)) {
        database.users = loadedData.users.map((user) => {
          return new User(
            user.id,
            user.name,
            user.role,
            user.email,
            user.favorites
          );
        });
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

module.exports = { database, saveDatabase, loadDatabase };
