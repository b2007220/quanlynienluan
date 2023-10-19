const router = require('express').Router();
const adminMiddleware = require('../middlewares/admin.middleware');
const userController = require('../controllers/user.controller');

router.route('/').post(userController.create).get(adminMiddleware,userController.getAll);

router.route('/:id/unactive').patch(adminMiddleware,userController.unactiveUser);

router.route('/:id/teacher').patch(adminMiddleware,userController.changeTeacher);

router.route('/:id/admin').patch(adminMiddleware,userController.changeAdmin);

router.route('/:id/student').patch(adminMiddleware,userController.changeStudent);

router.route('/password/create').patch(userController.createPassword);

router.route('/password/change').patch(userController.changePassword);

router.route('/teachers').get(userController.getAllTeachers);
router
	.route('/:id')
	.get(userController.getById)
	.put(userController.updateById)
	.delete(adminMiddleware,userController.deleteById)
	.patch(adminMiddleware,userController.activeUser);

module.exports = router;
