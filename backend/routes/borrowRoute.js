import express from "express";
import {
  borrowPostDEL,
  borrowPostGET,
  borrowPostPOST,
  borrowPostPUT,
  borrowPostGETId,
} from "../controllers/borrowController.js";

const router = express.Router();

router.post("/borrowpost", borrowPostPOST);
router.get("/borrowpost", borrowPostGET);
router.get("/borrowpost/:id", borrowPostGETId);
router.put("/borrowpost/:id", borrowPostPUT);
router.delete("/borrowpost/:id", borrowPostDEL);

export default router;
