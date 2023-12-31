import express from "express";
import {
  addOwnPost,
  deleteOwnPost,
  getProfileByUsername,
  getProfileByUsersID,
  profileUpdate,
  savePost,
  unSavePost,
} from "../controllers/profileController.js";

/**
 * Express router for handling profile routes.
 * @type {import('express').Router}
 */
const router = express.Router();
/*
  When we finish the project remove it out of the comment
  router.use(requireAuth)
*/
router.get("/profile/:id", getProfileByUsersID);
router.get("/profile-name", getProfileByUsername);
router.put("/update-profile", profileUpdate);
router.put("/add-ownPost", addOwnPost);
router.put("/delete-ownPost", deleteOwnPost);
router.put("/savepost", savePost);
router.put("/unsavepost", unSavePost);

export default router;
