import express from "express";
import {
  conversationGETByID,
  conversationGETByUserID,
  conversationPOST,
  conversationPUTUpdate,
} from "../controllers/conversationController.js";

/**
 * Express router for handling conversation routes.
 * @type {import('express').Router}
 */
const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/

router.post("/conversation", conversationPOST);
router.get("/conversation/userID/:id", conversationGETByUserID);
router.put("/conversation/conversationID/:id", conversationPUTUpdate);
router.get("/conversation/conversationID/:id", conversationGETByID);

export default router;
