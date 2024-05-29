const express = require('express');
const router = express.Router();
const { signup, myProfile, updateProfile, login, checkSession, listMyEvaluations } = require('../../controllers/authController');

router.post('/signup', signup);
router.post('/my-profile', myProfile);
router.post('/update-profile', updateProfile);
router.post('/login', login);
router.get('/checkSession', checkSession);
router.get('/list-my-evaluations', listMyEvaluations);

module.exports = router;