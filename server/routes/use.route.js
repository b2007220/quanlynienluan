const router = require('express').Router();

const useController = require('../controllers/use.controller');

router.route('/').post(useController.create).get(useController.getAll);

router.route('/:id').get(useController.getById).put(useController.updateById).delete(useController.deleteById);

router.route('/user/:userId').get(useController.getAllFromUser);

router.route('/semester').get(useController.getAllInSemester);

router.route('/teacher').get(useController.getUsesFromTeacher);

module.exports = router;
