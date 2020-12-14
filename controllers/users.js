const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      console.log(err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateCurrentUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      console.log(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateCurrentUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      console.log(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
