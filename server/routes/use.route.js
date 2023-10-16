const router = require('express').Router();

const useController = require('../controllers/use.controller');

router.route('/').post(useController.create).get(useController.getAll);

router.route('/user/:userId').get(useController.getAllFromUser);

router.route('/semester').get(useController.getAllInSemester);

router.route('/incharge').get(useController.getUsesFromIncharge);

router.route('/teacher').get(useController.getUsesFromTeacher);

router.route('/:id').get(useController.getById).put(useController.updateById).delete(useController.deleteById);

module.exports = router;
