const router = require('express').Router();

const yearControler = require('../controllers/year.controller');

router.route('/').post(yearControler.create).get(yearControler.getAll);

router.route('/:id').get(yearControler.getById).put(yearControler.updateById).delete(yearControler.deleteById);

module.exports = router;
