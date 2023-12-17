import express from "express";
import {
  createEmailToken,
  forgotPassword,
  getEmailToken,
  sendEmail,
} from "../controllers/emailController.js";
import {
  deleteUser,
  forgotPassword,
  loginUser,
  signupUser,
} from "../controllers/userController.js";
//controller functions

/**
 * Router for handling authentication routes.
 * @type {express.Router}
 */
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", signupUser);

//forgot password sends verification email
authRouter.post("/forgotPassword", forgotPassword);

//send verification email route
authRouter.post("/sendEmail", sendEmail);
authRouter.post("/emailToken", createEmailToken);
authRouter.post("/getEmailToken", getEmailToken);
authRouter.delete("/delete/:userId", deleteUser);

//forgot password actually changes user password
authRouter.post("/forgotpassword", forgotPassword);

export default authRouter;
