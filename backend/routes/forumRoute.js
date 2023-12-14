import express from "express";
import {
  forumEntryPOST,
  forumEntryDEL,
  forumEntryPUT,
  forumPostDEL,
  forumPostGET,
  forumPostGETId,
  forumPostPOST,
  forumPostPUT,
} from "../controllers/forumController.js";

const router = express.Router();

router.post("/forumpost", forumPostPOST);
router.get(
  "/forumpost/pg/:page/lm/:limit/c/:categories/d/:date/s/:search",
  forumPostGET
);
router.get("/forumpost/:id", forumPostGETId);
router.post("/forumpost/:id/", forumEntryPOST);
router.put("/forumpost/:id/:entryId", forumEntryPUT);
router.delete("/forumpost/:id/:entryId", forumEntryDEL);
router.put("/forumpost/:id", forumPostPUT);
router.delete("/forumpost/:id", forumPostDEL);

export default router;
