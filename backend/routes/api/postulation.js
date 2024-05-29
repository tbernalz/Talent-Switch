const express = require('express');
const router = express.Router();
const { createPostulation, getName, listPostulations, listMyPostulations, postulationDetail, acceptPostulation, rejectPostulation
 } = require('../../controllers/postulationController');

router.post('/create-postulation', createPostulation);
router.get('/get-name', getName);
router.get('/list-postulations', listPostulations);
router.get('/list-my-postulations', listMyPostulations);
router.get('/postulations/:id', postulationDetail);
router.put('/postulations/:id/accept', acceptPostulation);
router.put('/postulations/:id/reject', rejectPostulation);

module.exports = router;