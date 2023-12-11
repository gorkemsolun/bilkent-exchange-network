import { emailTokenDB } from "../models/emailToken.js";

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
