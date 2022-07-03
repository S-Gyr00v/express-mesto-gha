const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send(users);
  })
};

const getUsersId = (req, res) => {
  User.findOne({ _id: req.params.userId }).then((user) => {
     res.status(200).send(user);
  })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.status(201).send(user);
  });
};

module.exports = {
  getUsers,
  getUsersId,
  createUser,
};
