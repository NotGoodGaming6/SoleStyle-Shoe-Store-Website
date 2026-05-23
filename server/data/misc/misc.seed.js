const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('#models/misc/misc.product.model');
const Category = require('#models/misc/misc.category.model');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const products = [
  {
    id: 'puma-nitro-elite-3',
    name: 'Puma NITRO Elite 3',
    category: 'Running',
    price: 210,
    originalPrice: 250,
    discount: 15,
    isBestseller: true,
    isNewItem: true,
    image: '',
    description: 'The ultimate race-day shoe, built for speed and maximum energy return with NITRO™ Elite foam.',
    sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 'bugatti-atus-dark-blue',
    name: 'Bugatti Atus Dark Blue',
    category: 'Sneakers',
    price: 85,
    isBestseller: true,
    isNewItem: false,
    image: '',
    description: 'Sporty and elegant dark blue sneakers, perfect for a modern casual look with superior comfort.',
    sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 'decathlon-tarmak-kids',
    name: 'Decathlon Tarmak Kids',
    category: 'Basketball',
    price: 45,
    isBestseller: false,
    isNewItem: true,
    image: '',
    description: 'Intermediate basketball shoes for kids, providing excellent support and cushioning on the court.',
    sizes: [4, 5, 6, 7]
  },
  {
    id: 'sheepskin-mid-calf-boots',
    name: 'Sheepskin Mid-Calf Boots',
    category: 'Boots',
    price: 130,
    originalPrice: 160,
    discount: 20,
    isBestseller: false,
    isNewItem: false,
    image: '',
    description: 'Premium shearling-lined boots for ultimate warmth and style during the colder months.',
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: 'starlet-leather-army-green',
    name: 'Starlet Leather Army Green',
    category: 'Casual',
    price: 75,
    isBestseller: true,
    isNewItem: true,
    image: '',
    description: 'Sophisticated army green leather shoes, blending classic style with everyday versatility.',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: 'artisan-sandals',
    name: 'Artisan Artisan Sandals',
    category: 'Sandals',
    price: 55,
    isBestseller: false,
    isNewItem: true,
    image: '',
    description: 'Unique artisan-made sandals features handcrafted details and natural materials for a bohemian vibe.',
    sizes: [6, 7, 8, 9, 10]
  }
];

const categories = [
  { name: 'Running', description: 'Performance shoes built for speed and endurance', count: 0 },
  { name: 'Sneakers', description: 'Classic and contemporary streetwear styles', count: 0 },
  { name: 'Basketball', description: 'Court-ready shoes with superior ankle support', count: 0 },
  { name: 'Casual', description: 'Everyday comfort meets effortless style', count: 0 },
  { name: 'Boots', description: 'Rugged style for any terrain', count: 0 },
  { name: 'Sandals', description: 'Breathable comfort for warmer days', count: 0 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Category.deleteMany();
    await Product.insertMany(products);
    await Category.insertMany(categories);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
