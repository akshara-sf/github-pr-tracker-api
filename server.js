// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


// GitHub token (optional, use .env file)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

app.get('/prs', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username in query' });

  const url = `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'GitHub API error' });
    }

    const data = await response.json();

    // Extract PRs
    const prs = data.items.map(pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      state: pr.state,
      html_url: pr.html_url,
      diff_url: pr.pull_request?.diff_url,
      patch_url: pr.pull_request?.patch_url,
      issue_url: pr.url,
      user: {
        login: pr.user.login,
        id: pr.user.id,
        avatar_url: pr.user.avatar_url,
        html_url: pr.user.html_url
      }
    }));

    res.json(prs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
