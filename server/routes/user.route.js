const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.route('/').post(userController.create).get(userController.getAll);

router
	.route('/:id')
	.get(userController.getById)
	.put(userController.updateById)
	.delete(userController.deleteById)
	.patch(userController.activeUser);

router.route('/:id/unactive').patch(userController.unactiveUser);

router.route('/:id/teacher').patch(userController.changeTeacher);

router.route('/:id/student').patch(userController.changeStudent);

module.exports = router;
