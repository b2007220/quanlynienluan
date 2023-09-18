const router = require('express').Router();

const semesterController = require('../controllers/semester.controller');

router.route('/').post(semesterController.create).get(semesterController.getAll);
router.route('/current').get(semesterController.getCurrentSemester);

router
	.route('/:id')
	.get(semesterController.getById)
	.put(semesterController.updateById)
	.delete(semesterController.deleteById);
router.route('/:year/semesters').get(semesterController.getSemestersByYearId);

module.exports = router;
