const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!['user', 'seller', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  if (user.role === 'admin') {
    return res.status(400).json({ success: false, message: 'Cannot change admin role' });
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Role updated',
    data: { _id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

module.exports = { getUsers, updateUserRole };
