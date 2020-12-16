const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error.js');
const ValidationError = require('../errors/validation-error.js');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({
    _id: req.params.id,
    owner: { _id: req.user._id },
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.send({ data: card });
    })
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.send({ data: card });
    })
    .catch(next);
};
