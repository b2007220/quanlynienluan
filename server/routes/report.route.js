const router = require('express').Router();

const reportController = require('../controllers/report.controller');

router.route('/').post(reportController.create).get(reportController.getAll);

router.route('/:id').get(reportController.getById).put(reportController.updateById).delete(reportController.deleteById);

router.route('/enroll/:id').get(reportController.getReportsByEnroll);

module.exports = router;
