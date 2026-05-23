const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
      size: String,
      category: String,
      image: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    default: 0
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  taxRate: {
    type: Number,
    default: 0
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String
  },
  shippingAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card'],
    default: 'Cash'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
