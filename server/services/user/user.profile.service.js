const User = require('#models/misc/misc.user.model');
const bcrypt = require('bcryptjs');

exports.getProfileService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

exports.updateProfileService = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.email === 'admin@solestyle.com' && updateData.email && updateData.email !== 'admin@solestyle.com') {
    throw new Error('The email of the principal administrator account cannot be changed');
  }

  const allowedUpdates = ['name', 'email', 'phone'];
  const filteredData = {};
  
  Object.keys(updateData).forEach(key => {
    if (allowedUpdates.includes(key)) {
      filteredData[key] = updateData[key];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: filteredData },
    { new: true, runValidators: true }
  ).select('-password');

  return updatedUser;
};

exports.updatePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  if (currentPassword === newPassword) {
    throw new Error('New password cannot be the same as the current password');
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new Error('New password cannot be the same as the current password');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return { message: 'Password updated successfully' };
};

const Product = require('#models/misc/misc.product.model');

exports.getWishlistService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  
  if (!user.wishlist || user.wishlist.length === 0) return [];
  
  const products = await Product.find({ id: { $in: user.wishlist } });
  return products;
};

exports.toggleWishlistService = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  
  if (!user.wishlist) user.wishlist = [];
  
  const index = user.wishlist.indexOf(productId);
  let action = '';
  
  if (index === -1) {
    user.wishlist.push(productId);
    action = 'added';
  } else {
    user.wishlist.splice(index, 1);
    action = 'removed';
  }
  
  await user.save();
  return { action, productId, wishlist: user.wishlist };
};
