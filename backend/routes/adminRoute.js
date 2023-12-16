import express from "express";
import {
  getReportedPosts,
  reportPost,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/reportedposts", getReportedPosts);
router.post("/reportedposts", reportPost);

export default router;
