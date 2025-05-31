const express = require("express");
const dotenv = require("dotenv");
const prRoutes = require('./routes/githubRoutes');

dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use('/api', prRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to GitHub PR Tracker API. Use /api/prs?owner=xxx&repo=yyy');
});
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
