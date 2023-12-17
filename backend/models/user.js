import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";

/**
 * UserSchema represents the schema for the User model in the database.
 *
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {boolean} isAdmin - Indicates whether the user is an admin or not.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} image - The image URL of the user.
 * @property {boolean} verified - Indicates whether the user's email is verified or not.
 * @property {string} emailToken - The token used for email verification.
 * @property {Array<string>} conversations - The array of conversation IDs associated with the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    emailToken: {
      type: String,
    },
    conversations: [
      {
        type: String,
        ref: "Conversation",
        userID: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.signup = async function (username, email, password) {
  if (!email || !password || !username) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const token = crypto.randomBytes(64).toString("hex");

  const user = await this.create({
    username,
    email,
    password: hash,
    image: "",
    emailToken: token,
  });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  } else {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    return user;
  }
};

export const User = mongoose.model("User", UserSchema);
