import express from "express";
import {requireAuth} from "../middleware/requireAuth.js"
import {
  borrowPostDEL,
  borrowPostGET,
  borrowPostPOST,
  borrowPostPUT,
  borrowPostGETId,
} from "../controllers/borrowController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/

router.post("/borrowpost", borrowPostPOST);
router.get("/borrowpost", borrowPostGET);
router.get("/borrowpost/:id", borrowPostGETId);
router.put("/borrowpost/:id", borrowPostPUT);
router.delete("/borrowpost/:id", borrowPostDEL);

export default router;
