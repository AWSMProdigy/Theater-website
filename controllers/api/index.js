const router = require('express').Router();

const userRoutes = require('./user-routes');
const friendshipRoutes = require('./friendship-routes');
const movieRoutes = require('./movie-routes');

router.use('/users', userRoutes);
router.use('/friends', friendshipRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
