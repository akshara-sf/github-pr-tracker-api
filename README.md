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

```Hosted (Render):
GET https://github-pr-tracker-api.onrender.com/api/prs/Jitesh2604
```

---

## 📘 Sample Response

```json
{
    "user": "Jitesh2604",
    "open_pull_requests": [
        {
            "title": "Server",
            "repo": "My-Library",
            "created_at": "2025-05-13T11:01:09Z"
        }
    ],
    "closed_pull_requests": [],
    "merged_pull_requests": [
        {
            "title": "day5",
            "repo": "Square_sink-7224",
            "created_at": "2022-07-24T19:21:42Z",
            "merged_at": "2022-07-24T19:21:52Z"
        },
        {
            "title": "day5",
            "repo": "Square_sink-7224",
            "created_at": "2022-07-23T17:38:49Z",
            "merged_at": "2022-07-23T17:38:58Z"
        },
        {
            "title": "day4",
            "repo": "Square_sink-7224",
            "created_at": "2022-07-22T08:38:17Z",
            "merged_at": "2022-07-22T08:38:26Z"
        },
        {
            "title": "day3",
            "repo": "Square_sink-7224",
            "created_at": "2022-07-22T08:37:48Z",
            "merged_at": "2022-07-22T08:37:58Z"
        },
        {
            "title": "Day2",
            "repo": "Square_sink-7224",
            "created_at": "2022-07-22T08:37:21Z",
            "merged_at": "2022-07-22T08:37:31Z"
        }
    ]
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
