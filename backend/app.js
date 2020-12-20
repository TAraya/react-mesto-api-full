const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users.js');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error.js');
const { notWhitespacesValidator } = require('./utils/validation.js');

const {
  PORT = 3001,
  CONN_STRING = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

mongoose.connect(CONN_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().custom(notWhitespacesValidator),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).custom(notWhitespacesValidator),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/cards', cardsRouter);

app.use('/users', usersRouter);

// eslint-disable-next-line no-unused-vars
app.use('/', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors()); // validation errors

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

app.listen(PORT, () => {});
