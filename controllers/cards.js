const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Cервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Cервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: ' Карточка с указанным _id не найдена' });
      }
      return res.send(card);
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Cервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Cервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: ' Переданы некорректные данные для снятии лайка' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Cервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};
