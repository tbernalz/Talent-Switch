const express = require('express');
const router = express.Router();
const { addApplicant, listApplicants } = require('../../controllers/applicantController');

router.post('/add-applicant', addApplicant);
router.get('/opportunities/:id/list-applicants', listApplicants);

module.exports = router;