import express from "express";
import {
  lostfoundPostDEL,
  lostfoundPostGET,
  lostfoundPostPOST,
  lostfoundPostPUT,
  lostfoundPostGETId,
} from "../controllers/lostfoundController.js";

const router = express.Router();

router.post("/lostfoundpost", lostfoundPostPOST);
router.get("/lostfoundpost", lostfoundPostGET);
router.get("/lostfoundpost/:id", lostfoundPostGETId);
router.put("/lostfoundpost/:id", lostfoundPostPUT);
router.delete("/lostfoundpost/:id", lostfoundPostDEL);

export default router;
