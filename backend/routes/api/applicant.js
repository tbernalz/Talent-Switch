const express = require('express');
const router = express.Router();
const { addApplicant, listApplicants, acceptApplicant, rejectApplicant } = require('../../controllers/applicantController');

router.post('/add-applicant', addApplicant);
router.get('/opportunities/:id/list-applicants', listApplicants);
router.put('/opportunities/:id/applicants/:applicantId/accept', acceptApplicant);
router.put('/opportunities/:id/applicants/:applicantId/reject', rejectApplicant);

module.exports = router;
