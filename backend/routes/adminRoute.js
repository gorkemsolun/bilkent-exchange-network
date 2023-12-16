import express from 'express';
const router = express.Router();
import {getReportedPosts} from '../controllers/adminController.js';

// Route to get reported posts
router.get('/reported-posts', getReportedPosts);

export default router;
