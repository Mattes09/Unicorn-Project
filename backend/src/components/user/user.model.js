class User {
  constructor(id, name, role, email) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.favorites = [];
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
    console.log("Database structure in DAO:", this.database);
  }

  getUser(id) {
    return this.database.users.find((user) => user.id === id);
  }

  getAllUsers() {
    console.log("Users in database :", this.database.users);
    return this.database.users;
  }

  addFavorite(userId, flashcardId) {
    const user = this.getUser(userId);
    if (user) {
      user.addFavorite(flashcardId);
      this.database.saveDatabase;
      return user;
    }
    return null;
  }

  removeFavorite(userId, flashcardID) {
    const user = this.getUser(userId);
    if (user) {
      user.removeFavorite(flashcardID);
      this.database.saveDatabase;
      return user;
    }
    return null;
  }
}

module.exports = { User, UserDAO };
