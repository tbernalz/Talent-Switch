const express = require('express');
const router = express.Router();
const { createTeam, listTeams, listMyTeams, teamDetail } = require('../../controllers/teamController');

router.post('/create-team', createTeam);
router.get('/list-teams', listTeams);
router.get('/list-my-teams', listMyTeams);
router.get('/teams/:id', teamDetail);

module.exports = router;