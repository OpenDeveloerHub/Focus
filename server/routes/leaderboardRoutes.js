const express = require('express');
const { getLeaderboard, getUserRank } = require('../controllers/leaderboardController');
const router = express.Router();

router.get('/weekly', getLeaderboard);
router.get('/weekly/:userId', getUserRank);

module.exports = router;