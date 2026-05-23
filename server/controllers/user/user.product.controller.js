const productService = require('#services/user/user.product.service');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProductsService(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductByIdService(req.params.id);
    res.json(product);
  } catch (error) {
    const status = error.message === 'Product not found' ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getSearchSuggestions = async (req, res) => {
  try {
    const suggestions = await productService.getSearchSuggestionsService(req.query.q);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getSearchSuggestions
};
