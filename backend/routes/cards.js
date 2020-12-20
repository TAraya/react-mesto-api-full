const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();

const { urlValidator } = require('../utils/validation.js');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(urlValidator),
    }),
  }),
  createCard,
);

cardsRouter.delete(
  '/:id',
  celebrate({
    headers: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  deleteCard,
);

cardsRouter.put(
  '/:id/likes',
  celebrate({
    headers: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  likeCard,
);

cardsRouter.delete(
  '/:id/likes',
  celebrate({
    headers: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  unlikeCard,
);

module.exports = cardsRouter;
