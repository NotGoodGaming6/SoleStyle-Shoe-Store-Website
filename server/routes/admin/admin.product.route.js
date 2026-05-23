const express = require('express');
const router = express.Router();
const adminProductController = require('#controllers/admin/admin.product.controller');
const { protect, admin } = require('#middleware/user/user.auth.middleware');
const upload = require('#middleware/upload.middleware');

router.use(protect);
router.use(admin);

router.post('/', upload.single('image'), adminProductController.createProduct);
router.put('/:id', upload.single('image'), adminProductController.updateProduct);
router.delete('/:id', adminProductController.deleteProduct);

module.exports = router;
