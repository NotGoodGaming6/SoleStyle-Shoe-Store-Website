const express = require('express');
const router = express.Router();
const adminUserController = require('#controllers/admin/admin.user.controller');
const { protect, admin } = require('#middleware/user/user.auth.middleware');

router.use(protect);
router.use(admin);

router.get('/', adminUserController.getAllUsers);
router.put('/:id/role', adminUserController.updateUserRole);
router.delete('/:id', adminUserController.deleteUser);

module.exports = router;
