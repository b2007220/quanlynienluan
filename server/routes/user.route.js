const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.route('/').post(userController.create).get(userController.getAll);

router
	.route('/:id')
	.get(userController.getById)
	.put(userController.updateById)
	.delete(userController.deleteById)
	.patch(userController.changeActiveUserById);

router.route('/:id/unactive').patch(userController.changeUnactiveUserById);

module.exports = router;
