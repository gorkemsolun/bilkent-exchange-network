import mongoose from "mongoose";

const ForumPostSchema = new mongoose.Schema(
  {
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ForumPost = mongoose.model("ForumPost", ForumPostSchema);
