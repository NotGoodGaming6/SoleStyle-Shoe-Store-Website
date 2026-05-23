const adminProductService = require('#services/admin/admin.product.service');

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (typeof productData.sizes === 'string') {
      try {
        productData.sizes = JSON.parse(productData.sizes);
      } catch (e) {
        productData.sizes = productData.sizes.split(',').map(s => Number(s.trim()));
      }
    }
    if (req.file) {
      productData.image = `/uploads/products/${req.file.filename}`;
    }
    const savedProduct = await adminProductService.createProductService(productData);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (typeof productData.sizes === 'string') {
      try {
        productData.sizes = JSON.parse(productData.sizes);
      } catch (e) {
        productData.sizes = productData.sizes.split(',').map(s => Number(s.trim()));
      }
    }
    if (req.file) {
      productData.image = `/uploads/products/${req.file.filename}`;
    }
    const updatedProduct = await adminProductService.updateProductService(req.params.id, productData);
    res.json(updatedProduct);
  } catch (error) {
    const status = error.message === 'Product not found' ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await adminProductService.deleteProductService(req.params.id);
    res.json(result);
  } catch (error) {
    const status = error.message === 'Product not found' ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
};
