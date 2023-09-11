const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.route('/').post(userController.create).get(userController.getAll);

router.route('/:id').get(userController.getById).put(userController.updateById).delete(userController.deleteById);

module.exports = router;
