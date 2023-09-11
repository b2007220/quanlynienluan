const router = require('express').Router();

const semesterController = require('../controllers/semester.controller');

router.route('/').post(semesterController.create).get(semesterController.getAll);

router
	.route('/:id')
	.get(semesterController.getById)
	.put(semesterController.updateById)
	.delete(semesterController.deleteById);

module.exports = router;
