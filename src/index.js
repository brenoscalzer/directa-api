const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/user');
const product = require('./routes/product');
const cart = require('./routes/cart');

const cors = require('cors');
const InitiateMongoServer = require('./config/db');

require('dotenv').config()


const app = express();
app.use(cors());

// PORT
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Working' });
});

app.use('/users', user);
app.use('/products', product);
app.use('/carts', cart);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
  InitiateMongoServer();
});
