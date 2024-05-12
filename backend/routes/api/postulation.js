const express = require('express');
const router = express.Router();
const { createPostulation, getName, listPostulations, postulationDetail } = require('../../controllers/postulationController');

router.post('/create-postulation', createPostulation);
router.get('/get-name', getName);
router.get('/list-postulations', listPostulations);
router.get('/postulations/:id', postulationDetail);

module.exports = router;