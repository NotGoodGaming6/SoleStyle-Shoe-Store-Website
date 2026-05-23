const Product = require('#models/misc/misc.product.model');
const Category = require('#models/misc/misc.category.model');
const fs = require('fs');
const path = require('path');

const updateCategoryCount = async (categoryName) => {
  try {
    const count = await Product.countDocuments({ category: categoryName });
    await Category.findOneAndUpdate({ name: categoryName }, { count });
  } catch (err) {
    console.error('Error updating category count:', err);
  }
};

exports.createProductService = async (productData) => {
  const product = new Product(productData);
  const savedProduct = await product.save();
  
  await updateCategoryCount(savedProduct.category);
  
  return savedProduct;
};

exports.updateProductService = async (id, productData) => {
  const oldProduct = await Product.findOne({ id });
  if (!oldProduct) throw new Error('Product not found');

  if (productData.image && oldProduct.image && productData.image !== oldProduct.image) {
    const oldImagePath = path.join(__dirname, '../../../', oldProduct.image);
    if (oldProduct.image.startsWith('/uploads') && fs.existsSync(oldImagePath)) {
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { id },
    productData,
    { new: true }
  );

  if (oldProduct.category !== updatedProduct.category) {
    await updateCategoryCount(oldProduct.category);
    await updateCategoryCount(updatedProduct.category);
  } else {
    await updateCategoryCount(updatedProduct.category);
  }
  
  return updatedProduct;
};

exports.deleteProductService = async (id) => {
  const product = await Product.findOne({ id });
  if (!product) throw new Error('Product not found');

  if (product.image && product.image.startsWith('/uploads')) {
    const imagePath = path.join(__dirname, '../../../', product.image);
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error('Error deleting image file:', err);
      }
    }
  }

  const categoryName = product.category;
  await Product.findOneAndDelete({ id });
  
  await updateCategoryCount(categoryName);
  
  return { message: 'Product deleted successfully' };
};
