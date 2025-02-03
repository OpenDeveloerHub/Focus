const express = require('express');
const { addFocusSession } = require('../controllers/focusController');
const router = express.Router();

router.post('/add-session', addFocusSession);

module.exports = router;