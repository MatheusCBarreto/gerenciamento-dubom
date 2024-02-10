const express = require('express');
const app = express();
const router = require('./routes/routes');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/usersdubom');

app.use('/', router);

app.listen(80, () => {
  console.log('Serviço no ar!');
});
