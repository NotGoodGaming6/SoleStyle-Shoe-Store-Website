const mongoose = require('mongoose');
const crypto = require('crypto');

const productSchema = new mongoose.Schema({
  id: { 
    type: String, 
    unique: true,
    default: () => crypto.randomUUID()
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  isOnSale: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isNewItem: { type: Boolean, default: false },
  image: { type: String, default: '' },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 },
  sizes: [{ type: Number }]
});

module.exports = mongoose.model('Product', productSchema);
