const express = require('express');
const router = express.Router();
const { getCategories } = require('#controllers/user/user.category.controller');

router.get('/', getCategories);

module.exports = router;
