const router = require('express').Router();

const userControler = require('../controllers/user.controller');

router.route('/').post(userControler.create).get(userControler.getAll);

router.route('/:id').get(userControler.getById).put(userControler.updateById).delete(userControler.deleteById);

module.exports = router;
