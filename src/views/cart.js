const ProductView = require('./product')

const CartView = (doc) => ({
    id: doc._id,
    items: doc.items.map(item => ProductView(item)),
    createdAt: doc.createdAt
});

module.exports = CartView;