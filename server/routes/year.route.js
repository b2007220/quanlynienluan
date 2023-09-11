const router = require('express').Router();

const yearController = require('../controllers/year.controller');

router.route('/').post(yearController.create).get(yearController.getAll);

router.route('/:id').get(yearController.getById).put(yearController.updateById).delete(yearController.deleteById);

module.exports = router;
