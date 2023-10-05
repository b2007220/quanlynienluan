const router = require('express').Router();

const semesterController = require('../controllers/semester.controller');

router.route('/').post(semesterController.create).get(semesterController.getAll);

router.route('/current').get(semesterController.getCurrent);

router
	.route('/:id')
	.get(semesterController.getById)
	.put(semesterController.updateById)
	.delete(semesterController.deleteById);
router.route('/:year/semesters').get(semesterController.getSemestersByYearId);

router.route('/active/:id').patch(semesterController.activeSemester);

module.exports = router;
