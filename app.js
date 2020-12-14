const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '5fc29ff6fa261207bc4c53e2' };
  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {});
