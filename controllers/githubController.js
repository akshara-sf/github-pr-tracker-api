const axios = require('axios');

const getPullRequests = async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ message: 'Missing owner or repo query parameters' });
  }

  try {
    const openPRsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=10`;
    const closedPRsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=10`;

    const [openPRsRes, closedPRsRes] = await Promise.all([
      axios.get(openPRsUrl),
      axios.get(closedPRsUrl),
    ]);

    const mergedPRs = closedPRsRes.data.filter(pr => pr.merged_at !== null);

    const simplifyPR = pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      user: pr.user.login,
      state: pr.state,
      created_at: pr.created_at,
      merged_at: pr.merged_at,
      url: pr.html_url,
    });

    return res.json({
      open: openPRsRes.data.map(simplifyPR),
      closed: closedPRsRes.data.map(simplifyPR),
      merged: mergedPRs.map(simplifyPR),
    });
  } catch (error) {
    console.error('GitHub API error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'Error fetching pull requests' });
  }
};

module.exports = { getPullRequests };
