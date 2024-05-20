const express = require('express');
const router = express.Router();
const { toEvaluateMember, evaluateMember } = require('../../controllers/evaluationController');

router.post('/to-evaluate-member', toEvaluateMember);
router.post('/evaluate-member', evaluateMember);

module.exports = router;