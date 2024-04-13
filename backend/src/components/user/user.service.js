const database = require("../../database/databse");
const { UserDAO } = require("./user.model");

const UserService = {
  getUser: (req, res) => {
    const userId = req.params.id;
    const userDao = new UserDAO(database);

    const foundUser = userDao.getUser(userId);

    res.send({
      user: foundUser,
    });
  },
};
module.exports = UserService;
