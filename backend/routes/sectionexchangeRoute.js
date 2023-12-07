import express from "express";
import {
  sectionexchangePostDEL,
  sectionexchangePostGET,
  sectionexchangePostGETId,
  sectionexchangePostPOST,
  sectionexchangePostPUT,
} from "../controllers/sectionexchangeController.js";

const router = express.Router();

router.post("/sectionexchangepost", sectionexchangePostPOST);
router.get("/sectionexchangepost", sectionexchangePostGET);
router.get("/sectionexchangepost/:id", sectionexchangePostGETId);
router.put("/sectionexchangepost/:id", sectionexchangePostPUT);
router.delete("/sectionexchangepost/:id", sectionexchangePostDEL);

export default router;
