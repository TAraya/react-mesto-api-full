const { celebrate, Joi } = require('celebrate');

const cardsRouter = require('express').Router();

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
      link: Joi.string().uri(),
    }),
  }),
  createCard,
);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', unlikeCard);

module.exports = cardsRouter;
