const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Auto-update legacy 'Stride' branding to 'SoleStyle' in database settings
    const db = mongoose.connection.db;
    const settingsCollection = db.collection('settings');
    await settingsCollection.updateMany(
      { 'storeSettings.storeName': 'Stride' },
      {
        $set: {
          'storeSettings.storeName': 'SoleStyle',
          'storeSettings.storeEmail': 'support@solestyle.com',
          'appearance.promoBarText': 'Free shipping on orders over $75 | Use code SOLESTYLE20 for 20% off your first order'
        }
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
