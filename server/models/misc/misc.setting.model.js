const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  storeSettings: {
    storeName: { type: String, default: 'Stride' },
    storeEmail: { type: String, default: 'support@stride.com' },
    storePhone: { type: String, default: '+1 (555) 123-4567' },
    currency: { type: String, default: 'USD' },
    exchangeRates: {
      type: Map,
      of: Number,
      default: {
        'USD': 1,
        'AZN': 1.70,
        'EUR': 0.86,
        'TRY': 45.50,
        'GBP': 0.74
      }
    },
    freeShippingThreshold: { type: Number, default: 75 },
    taxRate: { type: Number, default: 8.5 }
  },
  appearance: {
    promoBarText: { type: String, default: 'Free shipping on orders over $75 | Use code STRIDE20 for 20% off your first order' },
    promoBarEnabled: { type: Boolean, default: true }
  },
  notifications: {
    newOrder: { type: Boolean, default: true },
    lowStock: { type: Boolean, default: true },
    newUser: { type: Boolean, default: false },
    orderStatusChange: { type: Boolean, default: true },
    dailySummary: { type: Boolean, default: false },
    weeklySummary: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
