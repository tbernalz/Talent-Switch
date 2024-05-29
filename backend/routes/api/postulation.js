const express = require('express');
const router = express.Router();
const { createPostulation, getName, listPostulations, listMyPostulations, postulationDetail } = require('../../controllers/postulationController');

router.post('/create-postulation', createPostulation);
router.get('/get-name', getName);
router.get('/list-postulations', listPostulations);
router.get('/list-my-postulations', listMyPostulations);
router.get('/postulations/:id', postulationDetail);

module.exports = router;