const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', unlikeCard);

module.exports = cardsRouter;
