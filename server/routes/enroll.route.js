const router = require('express').Router();

const enrollController = require('../controllers/enroll.controller');

router.route('/').post(enrollController.create).get(enrollController.getAll);
router.route('/use').post(enrollController.createEnrollFromUse);
router.route('/student').get(enrollController.getFromStudent);
router.route('/teacher/:teacherId').get(enrollController.getByTeacherId);
router.route('/teacher/master/:teacherId').get(enrollController.getByTeacherMasterId);
router.route('/teacher/basis/:teacherId').get(enrollController.getByTeacherBasisId);

router.route('/:id').get(enrollController.getById).put(enrollController.updateById).delete(enrollController.deleteById);

module.exports = router;
