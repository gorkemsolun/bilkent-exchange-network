import mongoose from "mongoose";

/**
 * @typedef {Object} DonatePostSchema
 * @property {string} title - The title of the donate post.
 * @property {string} description - The description of the donate post.
 * @property {string} image - The image URL of the donate post.
 * @property {string} poster - The username of the poster.
 * @property {string} category - The category of the donate post.
 * @property {Date} createdAt - The timestamp when the donate post was created.
 * @property {Date} updatedAt - The timestamp when the donate post was last updated.
 */
const DonatePostSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DonatePost = mongoose.model("DonatePost", DonatePostSchema);
