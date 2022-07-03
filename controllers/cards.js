const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.status(200).send(cards);
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => {
    res.status(201).send(card);
  });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId).then((card) => {
      res.status(200).send(card);
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
