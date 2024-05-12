const express = require('express');
const router = express.Router();
const { createOpportunity, listOpportunities, opportunityDetail } = require('../../controllers/opportunityController');

router.post('/create-opportunity', createOpportunity);
router.get('/list-opportunities', listOpportunities);
router.get('/opportunities/:id', opportunityDetail);

module.exports = router;