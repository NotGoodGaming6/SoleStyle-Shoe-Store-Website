const fs = require('fs');
const path = require('path');
const Product = require('../models/misc/misc.product.model');

const productsDir = path.resolve(__dirname, '../../client/public/images/products');

const formatName = (str) => {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const startWatcher = () => {
  console.log('[Watcher] Initializing Recursive Watcher...');

  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  console.log(`[Watcher] Watching: ${productsDir} (Recursive)`);

  const processingFiles = new Set();

  fs.watch(productsDir, { recursive: true }, async (eventType, filename) => {
    if (filename) {
      if (processingFiles.has(filename)) return;
      processingFiles.add(filename);
      setTimeout(() => processingFiles.delete(filename), 5000);

      const filePath = path.join(productsDir, filename);
      
      setTimeout(async () => {
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) return;
          if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(filename)) return;

          try {
            const pathParts = filename.split(/[\\/]/);
            let category = 'General';
            let fileNameOnly = filename;

            if (pathParts.length > 1) {
              category = pathParts[0];
              fileNameOnly = pathParts[pathParts.length - 1];
            }

            const nameWithoutExt = path.parse(fileNameOnly).name;
            const nameParts = nameWithoutExt.split('_');

            let rawName = nameWithoutExt;
            let price = 99;

            if (nameParts.length >= 2) {
              const lastPart = nameParts[nameParts.length - 1];
              if (!isNaN(parseFloat(lastPart))) {
                price = parseFloat(lastPart);
                rawName = nameParts.slice(0, -1).join(' ');
              }
            }

            const formattedName = formatName(rawName);
            const formattedCategory = formatName(category);

            const imagePath = `/images/products/${filename.replace(/\\/g, '/')}`;
            
            const existingProduct = await Product.findOne({ image: imagePath });
            if (existingProduct) {
              console.log(`[Watcher] Image ${filename} already exists. Skipping creation.`);
              return;
            }

            const newProduct = new Product({
              name: formattedName,
              category: formattedCategory,
              price: price,
              originalPrice: Math.round(price * 1.2),
              image: imagePath,
              description: `Discover the premium ${formattedName}. A perfect addition to our ${formattedCategory} collection, designed for both style and comfort.`,
              stock: 25,
              sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
              isNewItem: true,
              isBestseller: Math.random() > 0.8
            });

            await newProduct.save();
            console.log(`[Watcher] SUCCESS: ${formattedName} ($${price}) added to ${formattedCategory}`);
          } catch (error) {
            console.error(`[Watcher] Error:`, error.message);
          }
        }
      }, 1500); 
    }
  });
};

module.exports = startWatcher;
