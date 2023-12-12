import mongoose from "mongoose";

const ForumEntrySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    voteScore: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const ForumEntry = mongoose.model("ForumEntry", ForumEntrySchema);
