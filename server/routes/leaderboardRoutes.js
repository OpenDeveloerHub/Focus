const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

router.get('/weekly', getLeaderboard);

module.exports = router;