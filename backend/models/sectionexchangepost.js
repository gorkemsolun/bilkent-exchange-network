import mongoose from "mongoose";

const SectionexchangepostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    offeredSection: {
      type: String,
      required: true,
    },
    offeredCourse: {
      type: String,
      required: true,
    },
    desiredSection: {
      type: String,
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

export const Sectionexchangepost = mongoose.model(
  "Sectionexchangepost",
  SectionexchangepostSchema
);
