const express = require('express');
const router = express.Router();
const settingController = require('#controllers/admin/admin.setting.controller');
const { protect, admin } = require('#middleware/user/user.auth.middleware');

router.get('/', settingController.getSettings);
router.put('/', protect, admin, settingController.updateSettings);

module.exports = router;
