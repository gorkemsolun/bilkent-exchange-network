import express from "express";
import {
  secondhandPostDEL,
  secondhandPostGET,
  secondhandPostGETId,
  secondhandPostPOST,
  secondhandPostPUT,
} from "../controllers/secondhandController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/secondhandpost", secondhandPostPOST);
router.get("/secondhandpost/:id", secondhandPostGETId);
router.get(
  "/secondhandpost/so/:sort/pg/:page/lm/:limit/c/:categories/p/:price/d/:date/s/:search",
  secondhandPostGET
);
router.put("/secondhandpost/:id", secondhandPostPUT);
router.delete("/secondhandpost/:id", secondhandPostDEL);

export default router;
