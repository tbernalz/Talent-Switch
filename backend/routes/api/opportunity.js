const express = require('express');
const router = express.Router();
const { createOpportunity, listOpportunities, opportunityDetail, listMyOpportunities } = require('../../controllers/opportunityController');

router.post('/create-opportunity', createOpportunity);
router.get('/list-opportunities', listOpportunities);
router.get('/list-my-opportunities', listMyOpportunities);
router.get('/opportunities/:id', opportunityDetail);

module.exports = router;