const r = require('express').Router();
const c = require('../controllers/businessController');
const { protect } = require('../middleware/authMiddleware');
const { allow } = require('../middleware/roleMiddleware');
r.get('/', protect, c.list);
r.get('/me/dashboard', protect, allow('business'), c.dashboard);   // must stay above '/:id'
r.put('/me', protect, allow('business'), c.updateMe);
r.get('/me/branches', protect, allow('business'), c.listBranches);
r.post('/me/branches', protect, allow('business'), c.addBranch);
r.delete('/me/branches/:id', protect, allow('business'), c.deleteBranch);
r.get('/:id', protect, c.getOne);
module.exports = r;
