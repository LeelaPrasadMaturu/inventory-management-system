const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.get('/verify-email', userController.renderVerifyEmail);
router.post('/verify-code', userController.verifyCode);
router.post('/login', userController.login);

module.exports = router;
