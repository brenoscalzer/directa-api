const jwt = require('jsonwebtoken');
require('dotenv').config();

let functions = {}

functions.signin = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_KEY, // add expiration and refresh token logic
      (err, token) => {
        if (err) reject(err)
        else resolve(token)
      }
    );
  })
}

module.exports = functions
