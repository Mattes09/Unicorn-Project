const { User } = require("../components/user/user.model");

const daniel = new User(1, "Daniel", "admin", "email@seznam.cz");
const mates = new User(2, "Matej", "admin", "test@gmail.com");
const rumburak = new User(3, "Rumburak", "user", "usr@test.com");

const database = {
  users: [daniel, mates, rumburak],
};

module.exports = database;
