import mongoose from "mongoose";

/**
 * Represents the schema for a section exchange post.
 *
 * @typedef {Object} SectionexchangePostSchema
 * @property {string} poster - The name of the poster.
 * @property {string} posterUsername - The username of the poster.
 * @property {number} offeredSection - The section being offered for exchange.
 * @property {string} offeredCourse - The course being offered for exchange.
 * @property {number} desiredSection - The desired section for exchange.
 * @property {string} desiredCourse - The desired course for exchange.
 * @property {Date} createdAt - The timestamp when the post was created.
 * @property {Date} updatedAt - The timestamp when the post was last updated.
 */
const SectionexchangePostSchema = new mongoose.Schema(
  {
    poster: {
      type: String,
      required: true,
    },
    posterUsername: {
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
