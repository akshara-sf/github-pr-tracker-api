const express = require('express');
const router = express.Router();
const prController = require('../controllers/prController');

router.get('/prs', prController.getCategorizedPRs);

module.exports = router;
