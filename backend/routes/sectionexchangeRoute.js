import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  sectionexchangePostDEL,
  sectionexchangePostGET,
  sectionexchangePostGETId,
  sectionexchangePostPOST,
  sectionexchangePostPUT,
  sectionPostGETSearch,
} from "../controllers/sectionexchangeController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/sectionexchangepost", sectionexchangePostPOST);
router.get("/sectionexchangepost", sectionexchangePostGET);
router.get("/sectionexchangepost/:string", sectionPostGETSearch);
router.get("/sectionexchangepost/:id", sectionexchangePostGETId);
router.put("/sectionexchangepost/:id", sectionexchangePostPUT);
router.delete("/sectionexchangepost/:id", sectionexchangePostDEL);

export default router;
