import nodemailer from "nodemailer";
import { emailTokenDB } from "../models/emailToken.js";

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

  console.log(token.emailToken);

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

export const createEmailToken = async (req, res) => {
  try {
    const token = await emailToken.createToken();

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmailToken = async (req, res) => {
  const { emailToken } = req.body;

  console.log(emailToken);
  
  try {
    const theToken = await emailTokenDB.findOne({ emailToken });
    res.status(200).json({ theToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
