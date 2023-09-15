const router = require('express').Router();

const majorController = require('../controllers/major.controller');
const adminCheck = require('../middlewares/admin.middleware');

router.route('/').post(adminCheck, majorController.create).get(majorController.getAll);

router
	.route('/:id')
	.get(majorController.getById)
	.put(adminCheck, majorController.updateById)
	.delete(adminCheck, majorController.deleteById);

module.exports = router;
