import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.3+json",
};

const fetchPRs = async (username) => {
  const repoUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const repoRes = await axios.get(repoUrl, { headers });
    const repos = repoRes.data;

    if (!repos.length) {
      throw { status: 404, message: "No public repositories found" };
    }

    let open = [],
      closed = [],
      merged = [];

    for (const repo of repos) {
      const prUrl = `https://api.github.com/repos/${username}/${repo.name}/pulls?state=all`;

      const prRes = await axios.get(prUrl, { headers });

      for (const pr of prRes.data) {
        const base = {
          title: pr.title,
          repo: repo.name,
          created_at: pr.created_at,
        };

        if (pr.state === "open") {
          open.push(base);
        } else {
          const prDetailsUrl = `https://api.github.com/repos/${username}/${repo.name}/pulls/${pr.number}`;
          const detailsRes = await axios.get(prDetailsUrl, { headers });

          if (detailsRes.data.merged_at) {
            merged.push({ ...base, merged_at: detailsRes.data.merged_at });
          } else {
            closed.push(base);
          }
        }
      }
    }
    return {
      user: username,
      open_pull_requests: open,
      closed_pull_requests: closed,
      merged_pull_requests: merged,
    };
  } catch (err) {
    console.error("DEBUG ERROR:", err.response?.data || err.message || err);
  if (err.response?.status === 404) {
    throw { status: 404, message: "Invalid GitHub username." };
  } else if (err.response?.status === 403) {
    throw { status: 403, message: "GitHub API rate limit exceeded." };
  } else if (err.response?.status === 401) {
    throw { status: 401, message: "Bad credentials - invalid or missing GitHub token." };
  } else {
    throw { status: 500, message: "Internal Server Error" };
  }
  }
};

export default fetchPRs;