const mongoose = require('mongoose');
require('dotenv').config();

const MONGOURI = process.env.MONGO_URI;

const InitiateMongoServer = () => {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('connected to mongodb!')
  }).catch((err) => {
    console.log('err connecting to db')
  })
};

module.exports = InitiateMongoServer;
