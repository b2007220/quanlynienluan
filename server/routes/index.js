const { Router } = require('express');
const adminCheck = require('../middlewares/admin.middleware');
const teacherCheck = require('../middlewares/teacher.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/auth', authMiddleware, require('./auth.route'));
router.use('/topic', authMiddleware, require('./topic.route'));
router.use('/enroll', authMiddleware, require('./enroll.route'));
router.use('/report', authMiddleware, require('./report.route'));
router.use('/use', authMiddleware, require('./use.route'));
router.use('/semester', adminCheck, require('./semester.route'));
router.use('/major', adminCheck, require('./major.route'));
router.use('/users', authMiddleware, adminCheck, require('./user.route'));
router.use('/year', authMiddleware, adminCheck, require('./year.route'));
router.use('/grade', authMiddleware, teacherCheck, require('./grade.route'));

module.exports = router;
