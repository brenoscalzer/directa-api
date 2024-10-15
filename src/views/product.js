const ProductView = (doc) => ({
    id: doc._id,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    imageUrl: doc.imageUrl,
    createdAt: doc.createdAt
});

module.exports = ProductView;