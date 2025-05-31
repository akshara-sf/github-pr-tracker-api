const express = require('express');
const { getPullRequests } = require('../controllers/githubController');

const router = express.Router();

router.get('/prs', getPullRequests);

module.exports = router;
