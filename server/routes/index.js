const { Router } = require('express');
const adminCheck = require('../middlewares/admin.middleware');
const teacherCheck = require('../middlewares/teacher.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/auth', require('./auth.route'));
router.use('/topic', authMiddleware, require('./topic.route'));
router.use('/enroll', authMiddleware, require('./enroll.route'));
router.use('/report', authMiddleware, require('./report.route'));
router.use('/use', authMiddleware, require('./use.route'));
router.use('/semester', authMiddleware, require('./semester.route'));
router.use('/major', authMiddleware, require('./major.route'));
router.use('/users', authMiddleware, require('./user.route'));
router.use('/year', authMiddleware, adminCheck, require('./year.route'));

module.exports = router;
