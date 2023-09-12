const { Router } = require('express');
const adminCheck = require('../middlewares/admin.middleware');
const teacherCheck = require('../middlewares/teacher.middleware');
const { route } = require('./grade.route');

const router = Router();

router.use('/auth', require('./auth.route'));
router.use('/topic', require('./topic.route'));
router.use('/enroll', require('./enroll.route'));
router.use('/report', require('./report.route'));
router.use('/use', require('./use.route'));
router.use('/semester', adminCheck, require('./semester.route'));
router.use('/major', adminCheck, require('./major.route'));
router.use('/users', adminCheck, require('./user.route'));
router.use('/year', adminCheck, require('./year.route'));
route.use('/grade', teacherCheck, require('./grade.route'));

module.exports = router;
