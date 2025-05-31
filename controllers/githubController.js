const fetch = require('node-fetch');

const getPullRequests = async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Missing owner or repo query parameter' });
  }

  try {
    // Your logic to fetch PRs from GitHub API here
    // Example:
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all`);
    const data = await response.json();

    // Filter or structure data here as needed

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pull requests' });
  }
};

module.exports = { getPullRequests };
