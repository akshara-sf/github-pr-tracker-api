const axios = require('axios');

exports.getCategorizedPRs = async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Missing owner or repo in query parameters.' });
  }

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const prs = response.data;
    const categorizedPRs = {
      open: [],
      closed: [],
      merged: []
    };

    prs.forEach(pr => {
      const prData = {
        id: pr.id,
        number: pr.number,
        title: pr.title,
        user: pr.user.login,
        html_url: pr.html_url
      };

      if (pr.state === 'open') {
        categorizedPRs.open.push(prData);
      } else if (pr.state === 'closed' && pr.merged_at) {
        categorizedPRs.merged.push(prData);
      } else {
        categorizedPRs.closed.push(prData);
      }
    });
    res.json(categorizedPRs);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PRs', details: error.message });
  }
};
