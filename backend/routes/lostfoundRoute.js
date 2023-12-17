import express from "express";
import {
  lostfoundPostDEL,
  lostfoundPostGET,
  lostfoundPostGETId,
  lostfoundPostPOST,
  lostfoundPostPUT,
} from "../controllers/lostfoundController.js";

/**
 * Express router for handling lost and found routes.
 * @type {import('express').Router}
 */
const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/lostfoundpost", lostfoundPostPOST);
router.get(
  "/lostfoundpost/so/:sort/pg/:page/lm/:limit/c/:categories/s/:status/d/:date/s/:search",
  lostfoundPostGET
);
router.get("/lostfoundpost/:id", lostfoundPostGETId);
router.put("/lostfoundpost/:id", lostfoundPostPUT);
router.delete("/lostfoundpost/:id", lostfoundPostDEL);

export default router;
