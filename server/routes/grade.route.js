const router = require('express').Router();

const gradeController = require('../controllers/grade.controller');

router.route('/').post(gradeController.create).get(gradeController.getAll);

router.route('/:id').get(gradeController.getById).put(gradeController.updateById).delete(gradeController.deleteById);

module.exports = router;
