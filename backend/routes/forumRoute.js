import express from "express";
import {
  forumPostDEL,
  forumPostGET,
  forumPostGETId,
  forumPostPOST,
  forumPostPUT,
  forumEntryPOST,
} from "../controllers/forumController.js";

const router = express.Router();

router.post("/forumpost", forumPostPOST);
router.get("/forumpost/c/:categories/d/:date/s/:search", forumPostGET);
router.get("/forumpost/:id", forumPostGETId);
router.post("/forumpost/:id", forumEntryPOST);
router.put("/forumpost/:id", forumPostPUT);
router.delete("/forumpost/:id", forumPostDEL);

export default router;
