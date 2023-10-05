const router = require('express').Router();

const enrollController = require('../controllers/enroll.controller');

router.route('/').post(enrollController.create).get(enrollController.getAll);

router.route('/student').get(enrollController.getFromStudent);

router.route('/:id').get(enrollController.getById).put(enrollController.updateById).delete(enrollController.deleteById);

router.route('/teacher/:teacherId').get(enrollController.getByTeacherId);

module.exports = router;
