const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../middleware/auth');
const { signin } = require('../utils/functions');

const User = require('../models/user');
const Cart = require('../models/cart');

router.post('/signup', check('email', 'Please enter a valid email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array().at(0).msg
      });
    }

    const { email, password } = req.body;
    try {
      const user = new User({
        email,
        password,
        role: 'user'
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const userCart = new Cart({
        user: user._id,
        items: []
      });

      await userCart.save();

      const token = await signin(user)
      res.status(200).json({
        token
      });
    } catch (err) {
      res.status(400).json({
        message: err
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array().at(0).msg
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: 'Incorrect email or password'
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: 'Incorrect email or password'
        });

      const token = await signin(user)
      res.status(200).json({
        token
      });
    } catch (e) {
      console.log(e)
      res.status(400).json({
        message: e
      });
    }
  }
);

router.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error fetching user' });
  }
});

module.exports = router;
