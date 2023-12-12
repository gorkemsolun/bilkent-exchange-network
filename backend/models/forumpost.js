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
    voteScore: {
      type: Number,
      default: 0,
    },
    entries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ForumEntry",
    },
  },
  {
    timestamps: true,
  }
);

export const ForumPost = mongoose.model("ForumPost", ForumPostSchema);
