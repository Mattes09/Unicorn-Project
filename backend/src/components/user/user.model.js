class User {
  constructor(id, name, role, email, favorites = []) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.favorites = favorites;
  }

  addFavorite(flashcardId) {
    if (!this.favorites.includes(flashcardId)) {
      this.favorites.push(flashcardId);
    }
  }

  removeFavorite(flashcardId) {
    this.favorites = this.favorites.filter((id) => id !== flashcardId);
  }
}

class UserDAO {
  constructor(databaseConnection) {
    // Design pattern DEPENDENCY INJECTION
    this.database = databaseConnection;
  }

  getUser(id) {
    return this.database.users.find((user) => user.id === id);
  }

  getAllUsers() {
    return this.database.users;
  }

  addFavorite(userId, flashcardId) {
    const user = this.getUser(userId);
    if (user) {
      user.addFavorite(flashcardId);
      const { saveDatabase } = require("../../database/database");
      saveDatabase();
      return user;
    }
    return null;
  }

  removeFavorite(userId, flashcardID) {
    const user = this.getUser(userId);
    if (user) {
      user.removeFavorite(flashcardID);
      const { saveDatabase } = require("../../database/database");
      saveDatabase();
      return user;
    }
    return null;
  }
}

module.exports = { User, UserDAO };
