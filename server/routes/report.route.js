const router = require('express').Router();

const reportControler = require('../controllers/report.controller');

router.route('/').post(reportControler.create).get(reportControler.getAll);

router.route('/:id').get(reportControler.getById).put(reportControler.updateById).delete(reportControler.deleteById);

module.exports = router;
