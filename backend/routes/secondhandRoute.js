import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  secondhandPostDEL,
  secondhandPostGET,
  secondhandPostGETByCategories,
  secondhandPostGETId,
  secondhandPostPOST,
  secondhandPostPUT,
  secondhandpostGETSearch,
} from "../controllers/secondhandController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/secondhandpost", secondhandPostPOST);
router.get("/secondhandpost", secondhandPostGET);
router.get("/secondhandpost/:string", secondhandpostGETSearch);
router.get("/secondhandpost/:id", secondhandPostGETId);
router.get(
  "/secondhandpost/category/:categories",
  secondhandPostGETByCategories
);
router.put("/secondhandpost/:id", secondhandPostPUT);
router.delete("/secondhandpost/:id", secondhandPostDEL);

export default router;
