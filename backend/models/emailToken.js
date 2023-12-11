import mongoose from "mongoose";
import crypto from "crypto"

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

emailTokenSchema.statics.createToken = async function() {
    const token = crypto.randomBytes(64).toString("hex")
    const theToken = await this.create({emailToken:token})
    return theToken
}

export const emailTokenDB = mongoose.model(
  "emailToken",
  emailTokenSchema
);