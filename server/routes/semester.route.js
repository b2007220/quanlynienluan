const router = require('express').Router();

const semesterControler = require('../controllers/semester.controller');

router.route('/').post(semesterControler.create).get(semesterControler.getAll);

router.route('/:id').get(semesterControler.getById).put(semesterControler.updateById).delete(semesterControler.deleteById);

module.exports = router;
