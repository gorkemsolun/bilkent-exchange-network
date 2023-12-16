import express from "express";
import {
  createEmailToken,
  forgetPassword,
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

const authRouter = express.Router();

//login route
authRouter.post("/login", loginUser);

//signup route
authRouter.post("/signup", signupUser);

//forget password sends verification email
authRouter.post("/forgetPassword", forgetPassword);

//send verification email route
authRouter.post("/sendEmail", sendEmail);

//create email token
authRouter.post("/emailToken", createEmailToken);

//get email token
authRouter.post("/getEmailToken", getEmailToken);

// delete route
authRouter.delete("/delete/:userId", deleteUser);

//forgot password actually changes user password
authRouter.post("/forgotpassword", forgotPassword)



export default authRouter;
