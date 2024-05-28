const express = require('express');
const router = express.Router();
const { signup, myProfile, updateProfile, login, checkSession } = require('../../controllers/authController');

router.post('/signup', signup);
router.post('/my-profile', myProfile);
router.post('/update-profile', updateProfile);
router.post('/login', login);
router.get('/checkSession', checkSession);

module.exports = router;