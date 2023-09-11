const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.get('/', authMiddleware, authController.getProfile);

router.post('/login', authController.login);

router.post('/login-with-id-token', authController.loginWithIdToken);

module.exports = router;
