const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;
const app = express();
const { userAuthorization } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', userAuthorization, usersRouter);
app.use('/cards', userAuthorization, cardsRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Обращение к несуществующей странице'));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка, которую мы не предусмотрели' : message,
  });
  next();
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
