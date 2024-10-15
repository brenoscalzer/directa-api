const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');

const Product = require('../models/product');
const ProductView = require('../views/product');

router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      const parsedResult = products.map(product => ProductView(product._doc));
      res.status(200).json({
        products: parsedResult
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post('/', authAdmin, async (req, res) => {

    const { name, description, price } = req.body;
    try {
      const product = new Product({
        name,
        description,
        price,
        imageUrl: 'https://placehold.co/600x400'
      });

      await product.save();

      res.status(200).json({
        message: 'success'
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  }
);

module.exports = router;
