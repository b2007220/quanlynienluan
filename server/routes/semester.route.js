const router = require('express').Router();

const semesterController = require('../controllers/semester.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

router.route('/').post(adminMiddleware,semesterController.create).get(adminMiddleware,semesterController.getAll);

router.route('/current').get(semesterController.getCurrent);

router
	.route('/:id')
	.get(semesterController.getById)
	.put(adminMiddleware,semesterController.updateById)
	.delete(adminMiddleware,semesterController.deleteById);
router.route('/:year/semesters').get(semesterController.getSemestersByYearId);

router.route('/active/:id').patch(adminMiddleware,semesterController.activeSemester);

module.exports = router;
