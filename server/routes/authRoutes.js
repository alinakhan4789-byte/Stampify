const r = require('express').Router();
const { register, login, me, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
r.post('/register', register); r.post('/login', login); r.get('/me', protect, me);
r.post('/forgot-password', forgotPassword); r.post('/reset-password/:token', resetPassword);
module.exports = r;
