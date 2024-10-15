const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Cart = require('../models/cart');
const CartView = require('../views/cart');

router.get('/', auth, async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate("items");
      res.status(200).json({
        cart: CartView(cart)
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post('/add-item', auth, async (req, res) => {
    const { productId } = req.body;
    try {
      
      const cart = await Cart.findOne({ user: req.user.id });
      
      if (cart.items.includes(productId)) {
        res.status(400).send({
          message: 'Item is already included in your cart'
        });
      } else {
        cart.items = [
          ...cart.items,
          productId
        ];

        await cart.save();
      
        res.status(200).json({
          message: 'success'
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  }
);

module.exports = router;
