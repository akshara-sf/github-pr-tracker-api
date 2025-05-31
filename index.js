const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); 

dotenv.config();

const app = express();

const OWNER = 'Jitesh2604';
const REPO = 'github-pr-tracker-api';


app.get('/', (req, res) => {
  res.send('Welcome to GitHub PR Tracker API. Use /prs/:username');
});


app.get('/prs/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls?state=all`);
    const prs = await response.json();

    const userPRs = prs.filter(pr => pr.user.login.toLowerCase() === username.toLowerCase());

    if (userPRs.length === 0) {
      return res.json({ message: `No PRs found for user "${username}"` });
    }

    res.json(userPRs);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
