const express = require('express');
const router = express.Router();
const { addMember, listMembers, getUserId } = require('../../controllers/memberController');

router.post('/add-member', addMember);
router.get('/teams/:id/list-members', listMembers);
router.get('/get-user-id', getUserId);

module.exports = router;