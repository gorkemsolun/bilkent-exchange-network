import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, "bununbirsecretolmasılazımnormalde", {
    expiresIn: "2d",
  });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Create a jwt
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    //create a jwt
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//verify
export const verifyEmail = async (req, res) => {
  try
  {
    const emailToken = req.body.emailToken

    if (!emailToken) {
      return res.status(404).json("Email token not found")
    }

    const user = User.findOne({ emailToken })

    if (user) {
      user.emailToken = null
      user.isVerified = true
      await user.save()
      //create a jwt
      const token = createToken(user._id)

      res.status(200).json({user, token})
    } else {
      res.status(404).json("Email verification failed")
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
