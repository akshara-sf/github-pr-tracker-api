const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function isPRMerged(owner, repo, prNumber) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/merge`;
  const res = await fetch(url);
  if (res.status === 204) return true;
  if (res.status === 404) return false;
  throw new Error('GitHub API error while checking merge status');
}

async function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;

  const response = await fetch(url);
  console.log('Fetching repos:', url);
  console.log('Status:', response.status);

  if (response.status === 404) {
    throw new Error('User not found');
  }
  if (response.status === 403) {
    throw new Error('API rate limit exceeded');
  }

  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('User has no repositories or none are public');
  }
  return data;
}

async function getPRsForUser(username) {
  const repos = await getUserRepos(username);

  const openPRs = [];
  const closedNotMergedPRs = [];
  const mergedPRs = [];

  for (const repo of repos) {
    const owner = repo.owner.login;
    const repoName = repo.name;
    let page = 1;

    while (true) {
      const url = `https://api.github.com/repos/${owner}/${repoName}/pulls?state=all&per_page=100&page=${page}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Skipping repo ${repoName} due to error: ${response.status}`);
        break;
      }

      const prs = await response.json();
      if (prs.length === 0) break;

      for (const pr of prs) {
        if (pr.state === 'open') {
          openPRs.push(pr);
        } else if (pr.state === 'closed') {
          try {
            const merged = await isPRMerged(owner, repoName, pr.number);
            if (merged) mergedPRs.push(pr);
            else closedNotMergedPRs.push(pr);
          } catch {
            closedNotMergedPRs.push(pr); 
          }
        }
      }

      page++;
    }
  }

  return { openPRs, closedNotMergedPRs, mergedPRs };
}

app.get('/api/prs/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const prData = await getPRsForUser(username);
    res.json(prData);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
