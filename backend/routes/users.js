const { celebrate, Joi } = require('celebrate');

const usersRouter = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', getUser);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateCurrentUser,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri(),
    }),
  }),
  updateCurrentUserAvatar,
);

module.exports = usersRouter;
