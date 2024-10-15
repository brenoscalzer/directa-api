const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true
  },
  items: [{
    type: mongoose.Types.ObjectId,
    ref: 'products'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with CartSchema
module.exports = mongoose.model('carts', CartSchema);