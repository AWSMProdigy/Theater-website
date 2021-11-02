const router = require('express').Router();

const userRoutes = require('./user-routes');
const friendshipRoutes = require('./friendship-routes');

router.use('/users', userRoutes);
router.use('/friends', friendshipRoutes);

module.exports = router;
