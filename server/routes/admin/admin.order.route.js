const express = require('express');
const router = express.Router();
const adminOrderController = require('#controllers/admin/admin.order.controller');
const { protect, admin } = require('#middleware/user/user.auth.middleware');

router.use(protect);
router.use(admin);

router.get('/', adminOrderController.getAllOrders);
router.put('/:id', adminOrderController.updateOrderStatus);
router.delete('/:id', adminOrderController.deleteOrder);

module.exports = router;
