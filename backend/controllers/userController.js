import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BorrowPost } from "../models/borrowpost.js";
import { DonatePost } from "../models/donatepost.js";
import { ForumPost } from "../models/forumpost.js";
import { LostfoundPost } from "../models/lostfoundpost.js";
import { SecondhandPost } from "../models/secondhandpost.js";
import { SectionexchangePost } from "../models/sectionexchangepost.js";
import { User } from "../models/user.js";
import { UserProfile } from "../models/userProfile.js";

/**
 * Creates a token for the given user ID.
 * @param {string} _id - The user ID.
 * @returns {string} The generated token.
 */
const createToken = (_id) => {
  return jwt.sign({ _id }, "bununbirsecretolmasılazımnormalde", {
    expiresIn: "2d",
  });
};

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    const _id = user._id;
    const isAdmin = user.isAdmin;

    res.status(200).json({ email, _id, token, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Sign up a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is signed up.
 */
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user._id);
    const _id = user._id;

    await UserProfile.createProfile(_id, username, email);

    res.status(200).json({ email, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Deletes a user by their ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 */
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await UserProfile.findOne({ userID: userId });

    profile.ownPosts.map(async (post) => {
      if (post.typename === "Secondhand") {
        await SecondhandPost.findByIdAndDelete(post.id);
      } else if (post.typename === "Lostfound") {
        await LostfoundPost.findByIdAndDelete(post.id);
      } else if (post.typename === "Donate") {
        await DonatePost.findByIdAndDelete(post.id);
      } else if (post.typename === "Borrow") {
        await BorrowPost.findByIdAndDelete(post.id);
      } else if (post.typename === "Forum") {
        await ForumPost.findByIdAndDelete(post.id);
      } else if (post.typename === "SectionExchange") {
        await SectionexchangePost.findByIdAndDelete(post.id);
      }
    });

    profile.username = "removed";
    profile.email = "removed";
    profile.description = "removed";
    profile.ownPosts = null;
    profile.image = null;

    await profile.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Verifies the user's email using the provided email token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the email verification is complete.
 */
export const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) {
      return res.status(404).json("Email token not found");
    }

    const user = User.findOne({ emailToken });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      const token = createToken(user._id);

      res.status(200).json({ user, token });
    } else {
      res.status(404).json("Email verification failed");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/**
 * Handles the forgot password functionality.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hash }
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkIfUserAlreadyExists = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  const bilkentEmailRegex = /^[^\s@]+@ug\.bilkent\.edu\.tr$/;

  if (user) {
    res.status(500).json({ error: "Email already in use" });
  } else if (!bilkentEmailRegex.test(email)) {
    res.status(500).json({ error: "Not a Bilkent Mail" });
  } else {
    res.status(200).json({});
  }
};
