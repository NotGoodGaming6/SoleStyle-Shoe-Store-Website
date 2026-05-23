const profileService = require('#services/user/user.profile.service');

exports.getProfile = async (req, res) => {
  try {
    const user = await profileService.getProfileService(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await profileService.updateProfileService(req.user._id, req.body);
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required' });
    }
    const result = await profileService.updatePasswordService(req.user._id, currentPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await profileService.getWishlistService(req.user._id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const result = await profileService.toggleWishlistService(req.user._id, productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
