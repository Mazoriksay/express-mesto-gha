const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '64aab70a08bef9328359d600' };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрос не был найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
