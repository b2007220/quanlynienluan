const { Router } = require('express');
const adminCheck = require('../middlewares/admin.middleware');
const teacherCheck = require('../middlewares/teacher.middleware');
const router = Router();

router.use('/users',adminCheck,require('./user.route'));
router.use('/auth', require('./auth.route'));
router.use('/major',adminCheck, require('./major.route'));
router.use('/topic',teacherCheck, require('./topic.route'));
router.use('/enroll',teacherCheck, require('./enroll.route'));
router.use('/report', require('./report.route'));
router.use('/year',adminCheck, require('./year.route'));
router.use('/use',teacherCheck, require('./use.route'));
router.use('/semester',adminCheck, require('./semester.route'));

module.exports = router;
