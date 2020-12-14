const usersRouter = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);

usersRouter.patch('/me', updateCurrentUser);
usersRouter.patch('/me/avatar', updateCurrentUserAvatar);

module.exports = usersRouter;
