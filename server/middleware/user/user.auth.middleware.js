const jwt = require('jsonwebtoken');
const User = require('#models/misc/misc.user.model');

const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'principal_admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
