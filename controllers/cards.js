const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require('../utils/constants');

const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => res.status(DEFAULT).send({ message: 'Ошибка по умолчанию.' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки.',
          });
      } else {
        res.status(DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: ' Карточка с указанным _id не найдена.' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({
            message: ' Переданы некорректные данные при удалении карточки.',
          });
      } else {
        res.status(DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятия лайка.',
          });
      } else {
        res.status(DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(NOT_FOUND)
          .send({
            message:
              'Переданы некорректные данные для постановки/снятии лайка.',
          });
      } else {
        res.status(DEFAULT).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
};
