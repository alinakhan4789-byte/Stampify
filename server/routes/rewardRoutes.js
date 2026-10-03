const r = require('express').Router();
const c = require('../controllers/rewardController');
const { protect } = require('../middleware/authMiddleware');
const { allow } = require('../middleware/roleMiddleware');
r.get('/', protect, allow('customer'), c.list);
r.post('/:id/redeem', protect, allow('customer'), c.redeem);
module.exports = r;
