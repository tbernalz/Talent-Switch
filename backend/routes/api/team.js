const express = require('express');
const router = express.Router();
const { createTeam, listTeams, teamDetail } = require('../../controllers/teamController');

router.post('/create-team', createTeam);
router.get('/list-teams', listTeams);
router.get('/teams/:id', teamDetail);

module.exports = router;