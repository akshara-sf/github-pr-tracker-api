import express from 'express';
import { getPullRequests } from "../controllers/githubController.js";

const router = express.Router();

router.get('/prs/:username', getPullRequests);

export default router;