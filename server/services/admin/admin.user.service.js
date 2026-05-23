const User = require('#models/misc/misc.user.model');

exports.getAllUsersService = async () => {
  return await User.find({}).select('-password').sort({ createdAt: -1 });
};

exports.deleteUserService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  if (user.email === 'admin@solestyle.com') {
    throw new Error('Principal administrator account cannot be deleted');
  }

  await User.findByIdAndDelete(id);
  return { message: 'User deleted successfully' };
};

exports.updateUserRoleService = async (id, role) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  if (user.email === 'admin@solestyle.com' || user.role === 'principal_admin') {
    throw new Error('Principal administrator account role cannot be changed');
  }
  
  user.role = role;
  await user.save();
  return user;
};
