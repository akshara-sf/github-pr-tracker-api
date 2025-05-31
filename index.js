import express from "express";
import dotenv from "dotenv";
import githubRoutes from './routes/githubRoutes.js';

dotenv.config();

const app = express();

app.use("/api", githubRoutes);

const prRoutes = require('./routes/pr');
app.use('/api', prRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
