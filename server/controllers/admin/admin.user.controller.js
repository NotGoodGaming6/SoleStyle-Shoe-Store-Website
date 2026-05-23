const adminUserService = require('#services/admin/admin.user.service');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminUserService.getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own admin account' });
    }
    const result = await adminUserService.deleteUserService(req.params.id);
    res.json(result);
  } catch (error) {
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    if (req.user.email !== 'admin@solestyle.com' && req.user.role !== 'principal_admin') {
      return res.status(403).json({ message: 'Only the principal administrator can change user roles' });
    }
    const { role } = req.body;

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own principal administrator role' });
    }

    const updatedUser = await adminUserService.updateUserRoleService(req.params.id, role);
    res.json(updatedUser);
  } catch (error) {
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};
