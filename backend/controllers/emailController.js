import nodemailer from "nodemailer";
import { emailTokenDB } from "../models/emailToken.js";
import { User } from "../models/user.js";

/**
 * Sends an email with verification mail to the specified recipient.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.name - The name of the recipient.
 * @param {string} req.body.email - The email address of the recipient.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - If there is an error while sending the email.
 */
export const sendEmail = async (req, res) => {
  const { name, email } = req.body;

  try {
    await sendVerificationMail(name, email);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Creates a mail transporter using nodemailer.
 * @returns {Object} The created mail transporter.
 */
const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bilkent.exchange.network@gmail.com",
      pass: "ciym glmn kdpi mbfp",
    },
  });

  return transporter;
};

/**
 * Sends a verification email to the specified user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sendVerificationMail = async (username, email) => {
  const token = await emailTokenDB.createToken();

  const transporter = createMailTransporter();

  const MailOptions = {
    from: "Bilkent Exchange Network",
    to: email,
    subject: "Verify your email.",
    html: `<p> Hi ${username}, please verify your email by clicking this link </p> 
                <a href = 'http://localhost:5000/signup?emailToken=${token.emailToken}&email=${email}'>Verify Your Email</a> `,
  };

  transporter.sendMail(MailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification mail sent");
    }
  });
};

/**
 * Checks if a user with the given email exists.
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, false otherwise.
 * @throws {Error} - Throws an error if the email is not provided.
 */
const checkIfUserExists = async (email) => {
  if (!email) {
    throw Error("All fields must be filled");
  }

  if (User.findOne(email)) {
    return true;
  }
  return false;
};

/**
 * Sends a verification email for password reset.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await sendForgotVerificationMail(email);
    res.json({ message: "Verification email sent successfully." });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Sends a verification email for password reset to the provided email address.
 * @param {string} email - The email address to send the verification email to.
 * @returns {Promise<void>} - A promise that resolves once the verification email is sent.
 */
export const sendForgotVerificationMail = async (email) => {
  // Check if the provided username and email exist (replace this with your actual logic)
  const userExists = await checkIfUserExists(email);

  if (!userExists) {
    console.log("User does not exist.");
    return;
  }
  const currentuser = await User.findOne({ email });

  const token = await emailTokenDB.createToken();

  const transporter = createMailTransporter();

  const MailOptions = {
    from: "Bilkent Exchange Network",
    to: email,
    subject: "Forgot Password.",
    html: `<p> Hi, please verify your email by clicking this link </p> 
            <a href='http://localhost:5000/newPassword?emailToken=${token.emailToken}&email=${email}'>Verify Your Email</a>`,
  };

  transporter.sendMail(MailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification mail sent");
    }
  });
};

/**
 * Creates an email token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the created token.
 */
export const createEmailToken = async (req, res) => {
  try {
    const token = await emailTokenDB.createToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves the email token from the request body and searches for it in the emailTokenDB.
 * If found, returns the token in the response.
 * If not found, returns an error message in the response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the token is retrieved and the response is sent.
 */
export const getEmailToken = async (req, res) => {
  const { emailToken } = req.body;

  try {
    const theToken = await emailTokenDB.findOne({ emailToken });
    res.status(200).json({ theToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
