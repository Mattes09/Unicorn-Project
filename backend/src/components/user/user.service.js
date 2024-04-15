const database = require("../../database/database");
const { UserDAO } = require("./user.model");

const UserService = {
  getUser: (req, res) => {
    const userId = req.params.id;
    const userDao = new UserDAO(database);
    const foundUser = userDao.getUser(userId);
    if (!foundUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({
      user: foundUser,
    });
  },
};

const listUsers = (req, res) => {
  res.send(database);
};

module.exports = {
  UserService,
  listUsers,
};
