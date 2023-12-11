import mongoose from "mongoose";

const SectionexchangePostSchema = new mongoose.Schema(
  {
    poster: {
      type: String,
      required: true,
    },
    offeredSection: {
      type: Number,
      required: true,
    },
    offeredCourse: {
      type: String,
      required: true,
    },
    desiredSection: {
      type: Number,
      required: true,
    },
    desiredCourse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SectionexchangePost = mongoose.model(
  "SectionexchangePost",
  SectionexchangePostSchema
);
