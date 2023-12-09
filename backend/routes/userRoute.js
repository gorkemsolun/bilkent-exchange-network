import express from "express";
import { loginUser, signupUser, verifyEmail } from "../controllers/userController.js";
//controller functions

const authRouter = express.Router();

//login route
authRouter.post("/login", loginUser);

//signup route
authRouter.post("/signup", signupUser);

//verify email route
authRouter.post("/verify", verifyEmail);

//messanger route
authRouter.post("/message", message);

export default authRouter;
