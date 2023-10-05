const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.route('/').post(userController.create).get(userController.getAll);

router.route('/:id/unactive').patch(userController.unactiveUser);

router.route('/:id/teacher').patch(userController.changeTeacher);

router.route('/:id/student').patch(userController.changeStudent);

router.route('/password/create').patch(userController.createPassword);

router.route('/password/change').patch(userController.changePassword);

router.route('/teachers').get(userController.getAllTeachers);
router
	.route('/:id')
	.get(userController.getById)
	.put(userController.updateById)
	.delete(userController.deleteById)
	.patch(userController.activeUser);

module.exports = router;
