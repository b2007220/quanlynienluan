const router = require('express').Router();

const enrollController = require('../controllers/enroll.controller');

router.route('/').post(enrollController.create).get(enrollController.getAll);

router.route('/:id').get(enrollController.getById).put(enrollController.updateById).delete(enrollController.deleteById);

router.route('/student/:id').get(enrollController.getEnrollByStudentIdInSmester);

module.exports = router;
