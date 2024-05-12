const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const { database } = require("../../database/database");
const { UserDAO } = require("./user.model");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const userIdSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
  },
  required: ["id"],
  additionalProperties: false,
};

const UserService = {
  getUser: (req, res) => {
    const validate = ajv.compile(userIdSchema);
    const valid = validate({ id: parseInt(req.params.id) });

    if (!valid) {
      return res.status(400).send({ errors: validate.errors });
    }

    const userId = parseInt(req.params.id);
    const userDao = new UserDAO(database);

    const foundUser = userDao.getUser(userId);
    if (!foundUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({
      user: foundUser,
    });
  },

  listAllUsers: (req, res) => {
    const userDao = new UserDAO(database);
    const users = userDao.getAllUsers();
    console.log("Users being returned:", users);

    if (!users || users.length === 0) {
      res.status(404).send({ error: "No users found" });
    }
    res.send({ users: users });
  },

  addFavorite: (req, res) => {
    const userId = parseInt(req.params.userId);
    const flashcardId = parseInt(req.body.flashcardId);
    const user = new UserDAO(database).addFavorite(userId, flashcardId);
    if (!user) {
      return res
        .status(404)
        .send({ error: "User not found or invalid flashcard ID" });
    }

    res
      .status(200)
      .send({ message: "Favorite added successfully", user: user });
  },

  removeFavorite: (req, res) => {
    const userId = parseInt(req.params.userId);
    const flashcardId = parseInt(req.body.flashcardId);
    const user = new UserDAO(database).removeFavorite(userId, flashcardId);

    if (!user) {
      return res
        .status(404)
        .send({ error: "User not found or invalid flashcard ID" });
    }

    res.status(200).send({ message: "Favorite removed", user: user });
  },

  getUserFavorites: (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = new UserDAO(database).getUser(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const favorites = user.favorites
      .map((favId) => {
        return database.flashcards.find((fc) => fc.id === favId);
      })
      .filter((fc) => fc); // Ensure all favorites found

    if (!favorites.length) {
      return res.status(404).send({ error: "No favorites found" });
    }

    res.send({ favorites });
  },
};

module.exports = {
  UserService,
};
