const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getSearchSuggestions } = require('#controllers/user/user.product.controller');

router.get('/search/suggestions', getSearchSuggestions);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
