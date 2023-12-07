import express from "express";
import {
  donatePostDEL,
  donatePostGET,
  donatePostPOST,
  donatePostPUT,
  donatePostGETId,
} from "../controllers/donateController.js";

const router = express.Router();

router.post("/donatepost", donatePostPOST);
router.get("/donatepost", donatePostGET);
router.get("/donatepost/:id", donatePostGETId);
router.put("/donatepost/:id", donatePostPUT);
router.delete("/donatepost/:id", donatePostDEL);

export default router;
