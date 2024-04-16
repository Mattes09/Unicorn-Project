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

  listAllUsers: (req, res) => {
    const dao = new UserDAO(database);
    const users = dao.getAllUsers();
    res.send({ users: users });
  },
};

module.exports = {
  UserService,
};
