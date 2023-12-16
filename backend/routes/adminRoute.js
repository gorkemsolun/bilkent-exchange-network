import express from 'express';
const router = express.Router();
import { getReportedPosts, reportPost } from '../controllers/adminController.js';

// Route to get reported posts
router.get('/reportedposts', getReportedPosts);

// Route to report a post
router.post('/reportedposts', reportPost);

export default router;
