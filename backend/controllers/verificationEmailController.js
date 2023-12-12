import { sendVerificationMail } from "../utils/sendVerificationEmail.js";

export const sendEmail = async (req, res) => {
  const { name, email } = req.body;

  try {
    await sendVerificationMail(name, email);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
