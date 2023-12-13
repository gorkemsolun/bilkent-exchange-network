import mongoose from "mongoose";

const BorrowPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BorrowPost = mongoose.model("BorrowPost", BorrowPostSchema);
