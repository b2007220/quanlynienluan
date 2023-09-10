const router = require('express').Router();

const majorController = require('../controllers/major.controller');

router.route('/').post(majorController.create).get(majorController.getAll);

router.route('/:id').get(majorController.getById).put(majorController.updateById).delete(majorController.deleteById);

module.exports = router;
