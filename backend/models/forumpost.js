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
  },
  {
    timestamps: true,
  }
);

export const ForumEntry = mongoose.model("ForumEntry", ForumEntrySchema);

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
    entries: {
      type: [ForumEntrySchema],
    },
  },
  {
    timestamps: true,
  }
);

export const ForumPost = mongoose.model("ForumPost", ForumPostSchema);
