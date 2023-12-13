import express from "express";
import {
  conversationGETByID,
  conversationGETByUserID,
  conversationPOST,
  conversationPUTUpdate,
} from "../controllers/conversationController.js";

const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/

router.post("/conversation", conversationPOST);
router.get("/conversation/userID/:id", conversationGETByUserID);
router.put("/conversation/convetsationID/:id", conversationPUTUpdate);
router.get("/conversation/convetsationID/:id", conversationGETByID);

export default router;
