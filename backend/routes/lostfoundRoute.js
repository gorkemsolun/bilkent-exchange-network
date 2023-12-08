import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  lostfoundPostDEL,
  lostfoundPostGET,
  lostfoundPostPOST,
  lostfoundPostPUT,
  lostfoundPostGETId,
  lostfoundPostGETSearch,
} from "../controllers/lostfoundController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/lostfoundpost", lostfoundPostPOST);
router.get("/lostfoundpost", lostfoundPostGET);
router.get("/lostfoundpost/:string", lostfoundPostGETSearch);
router.get("/lostfoundpost/:id", lostfoundPostGETId);
router.put("/lostfoundpost/:id", lostfoundPostPUT);
router.delete("/lostfoundpost/:id", lostfoundPostDEL);

export default router;
