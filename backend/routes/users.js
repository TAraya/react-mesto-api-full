const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();

const { urlValidator } = require('../utils/validation.js');

const {
  getUsers,
  getCurrentUser,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);

usersRouter.get(
  '/:id',
  celebrate({
    headers: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  getUser,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(urlValidator),
    }),
  }),
  updateCurrentUserAvatar,
);

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

module.exports = usersRouter;
