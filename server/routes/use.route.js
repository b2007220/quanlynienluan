const router = require('express').Router();

const useController = require('../controllers/use.controller');

router.route('/').post(useController.create).get(useController.getAll);

router.route('/:id').get(useController.getById).put(useController.updateById).delete(useController.deleteById);

module.exports = router;
