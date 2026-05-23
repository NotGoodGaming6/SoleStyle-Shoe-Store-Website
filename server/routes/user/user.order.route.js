const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('#controllers/user/user.order.controller');
const { protect } = require('#middleware/user/user.auth.middleware');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

module.exports = router;
