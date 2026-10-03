const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization || '';
    if (!h.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized: token missing' });
    const { id } = jwt.verify(h.slice(7), process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
    next();
  } catch { res.status(401).json({ message: 'Not authorized: invalid or expired token' }); }
};
