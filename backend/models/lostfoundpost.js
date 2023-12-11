import mongoose from "mongoose";

const LostfoundpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lostfoundpost = mongoose.model(
  "Lostfoundpost",
  LostfoundpostSchema
);
