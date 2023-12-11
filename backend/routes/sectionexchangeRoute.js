import express from "express";
import {
  sectionexchangePostDEL,
  sectionexchangePostGET,
  sectionexchangePostGETId,
  sectionexchangePostPOST,
  sectionexchangePostPUT,
} from "../controllers/sectionexchangeController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/sectionexchangepost", sectionexchangePostPOST);
router.get(
  "/sectionexchangepost/p/:price/d/:date/s/:search/o/:offeredCourse/:offeredSection/d/:desiredCourse/:desiredSection",
  sectionexchangePostGET
);
router.get("/sectionexchangepost/:id", sectionexchangePostGETId);
router.put("/sectionexchangepost/:id", sectionexchangePostPUT);
router.delete("/sectionexchangepost/:id", sectionexchangePostDEL);

export default router;
