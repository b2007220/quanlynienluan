const router = require('express').Router();

const topicController = require('../controllers/topic.controller');

router.route('/').post(topicController.create).get(topicController.getAll);
router.route('/create-and-use').post(topicController.createAndUse);

router.route('/:id').get(topicController.getById).put(topicController.updateById).delete(topicController.deleteById);

module.exports = router;
