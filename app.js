const express = require('express');
const mongoose = require('mongoose');


const usersRouter = require('./routes/users');
const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});