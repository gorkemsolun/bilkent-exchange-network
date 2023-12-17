import mongoose from "mongoose";

/**
 * @typedef {Object} SecondhandPostSchema
 * @property {string} title - The title of the secondhand post.
 * @property {string} description - The description of the secondhand post.
 * @property {string} image - The image URL of the secondhand post.
 * @property {string} poster - The username of the poster.
 * @property {string} category - The category of the secondhand post.
 * @property {number} price - The price of the secondhand item.
 * @property {Date} createdAt - The timestamp when the secondhand post was created.
 * @property {Date} updatedAt - The timestamp when the secondhand post was last updated.
 */
const SecondhandPostSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SecondhandPost = mongoose.model(
  "SecondhandPost",
  SecondhandPostSchema
);
