exports.allow = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: `Only ${roles.join(' / ')} accounts can do this` });
