const express = require('express');
const router = express.Router();
const adminStatsController = require('#controllers/admin/admin.stats.controller');
const { protect, admin } = require('#middleware/user/user.auth.middleware');

router.use(protect);
router.use(admin);

router.get('/', adminStatsController.getDashboardStats);

module.exports = router;
