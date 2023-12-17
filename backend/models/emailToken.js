import crypto from "crypto";
import mongoose from "mongoose";

/**
 * Mongoose schema for email token.
 *
 * @typedef {Object} EmailTokenSchema
 * @property {string} emailToken - The email token.
 * @property {Date} createdAt - The creation date of the email token.
 * @property {Date} updatedAt - The last update date of the email token.
 */
const emailTokenSchema = new mongoose.Schema(
  {
    emailToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

emailTokenSchema.statics.createToken = async function () {
  const token = crypto.randomBytes(64).toString("hex");
  const theToken = await this.create({ emailToken: token });
  return theToken;
};

export const emailTokenDB = mongoose.model("emailToken", emailTokenSchema);
