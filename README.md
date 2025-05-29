# 🚀 GitHub Pull Request Tracker API

## 📌 Overview

This API fetches all pull requests (Open, Closed, Merged) from a GitHub user's public repositories and returns structured JSON data.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Axios
* GitHub REST API v3

---

## 📅 Installation

```bash
git clone https://github.com/YOUR_USERNAME/github-pr-tracker-api.git
cd github-pr-tracker-api
npm install
```

---

📦 NPM Packages Required

npm install express axios dotenv 

---

## 🔐 Environment Setup

Create a `.env` file and add:

```ini
PORT=8080
GITHUB_TOKEN=your_personal_access_token
```

> 💡 Create your GitHub token at: [GitHub Token Settings](https://github.com/settings/tokens)

---

## ▶️ Run the Server

```bash
npm start
```

---

## 🔗 API Endpoint

```http
GET /api/prs/:username
```

### ✅ Example:

```bash
GET http://localhost:8080/api/prs/Jitesh
```

---

## 📘 Sample Response

```json
{
  "user": "Jitesh",
  "open_pull_requests": [
    {
      "title": "Fix typo",
      "repo": "hello-world",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "closed_pull_requests": [],
  "merged_pull_requests": []
}
```

---

## ⚠️ Error Handling

| Error | Reason                              |
| ----- | ----------------------------------- |
| 404   | Invalid username or no repositories |
| 403   | GitHub API rate limit exceeded      |
| 500   | Internal Server Error               |

---

## 🤝 License

MIT

## ✨ Author

Jitesh Pal
