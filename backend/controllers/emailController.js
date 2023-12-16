import nodemailer from "nodemailer";
import { emailTokenDB } from "../models/emailToken.js";
import { User } from "../models/user.js";

export const sendEmail = async (req, res) => {
  const { name, email } = req.body;

  try {
    await sendVerificationMail(name, email);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const checkIfUserExists = async (email) => {
  if (!email) {
    throw Error("All fields must be filled");
  }

  if (User.findOne(email)) {
    return true;
  }
  return false;
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await sendForgetVerificationMail(email);
    res.json({ message: "Verification email sent successfully." });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendForgetVerificationMail = async (email) => {
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

export const createEmailToken = async (req, res) => {
  try {
    const token = await emailTokenDB.createToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmailToken = async (req, res) => {
  const { emailToken } = req.body;

  try {
    const theToken = await emailTokenDB.findOne({ emailToken });
    res.status(200).json({ theToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
