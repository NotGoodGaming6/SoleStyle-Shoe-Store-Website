const express = require('express');
const router = express.Router();
const profileController = require('#controllers/user/user.profile.controller');
const { protect } = require('#middleware/user/user.auth.middleware');

router.get('/me', protect, profileController.getProfile);
router.put('/update', protect, profileController.updateProfile);
router.put('/update-password', protect, profileController.updatePassword);

router.get('/wishlist', protect, profileController.getWishlist);
router.post('/wishlist/toggle', protect, profileController.toggleWishlist);

module.exports = router;
