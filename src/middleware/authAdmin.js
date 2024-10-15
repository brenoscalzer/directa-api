const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

module.exports = async function(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'Auth Error' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;

    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') return res.status(401).json({ message: 'Permission denied' });

    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Invalid Token' });
  }
};
