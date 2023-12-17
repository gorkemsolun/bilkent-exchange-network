import express from "express";
import {
  getReportedPosts,
  reportPost,
} from "../controllers/adminController.js";

/**
 * Express router object for handling admin routes.
 * @type {express.Router}
 */
const router = express.Router();

router.get("/reportedposts", getReportedPosts);
router.post("/reportedposts", reportPost);

export default router;
