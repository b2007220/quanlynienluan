const { Router } = require('express');

const router = Router();

router.use('/users', require('./user.route'));
router.use('/callback', require('./callback.route'));
router.use('/major',require('./major'))

module.exports = router;
