const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.get('/', authMiddleware, authController.getProfile);

router.post('/login', authController.login);


module.exports = router;
