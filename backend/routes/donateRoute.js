import express from "express";
import {
  donatePostDEL,
  donatePostGET,
  donatePostGETId,
  donatePostPOST,
  donatePostPUT,
} from "../controllers/donateController.js";

/**
 * Express router object for handling donation routes.
 * @type {import('express').Router}
 */
const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.post("/donatepost", donatePostPOST);
router.get(
  "/donatepost/so/:sort/pg/:page/lm/:limit/c/:categories/d/:date/s/:search",
  donatePostGET
);
router.get("/donatepost/:id", donatePostGETId);
router.put("/donatepost/:id", donatePostPUT);
router.delete("/donatepost/:id", donatePostDEL);

export default router;
