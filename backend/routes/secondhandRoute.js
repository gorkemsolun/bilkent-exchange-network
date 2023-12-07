import express from "express";
import {
  secondhandPostDEL,
  secondhandPostGET,
  secondhandPostGETId,
  secondhandPostPOST,
  secondhandPostPUT,
} from "../controllers/secondhandController.js";

const router = express.Router();

router.post("/secondhandpost", secondhandPostPOST);
router.get("/secondhandpost", secondhandPostGET);
router.get("/secondhandpost/:id", secondhandPostGETId);
router.put("/secondhandpost/:id", secondhandPostPUT);
router.delete("/secondhandpost/:id", secondhandPostDEL);

export default router;
