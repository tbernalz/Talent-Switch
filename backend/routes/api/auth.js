const express = require('express');
const router = express.Router();
const { signup, login, checkSession } = require('../../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/checkSession', checkSession);

module.exports = router;