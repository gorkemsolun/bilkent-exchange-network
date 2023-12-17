import mongoose from "mongoose";

/**
 * @typedef LostfoundPostSchema
 * @property {string} title - The title of the lost/found post.
 * @property {string} description - The description of the lost/found post.
 * @property {string} image - The image URL of the lost/found post.
 * @property {string} poster - The username of the poster.
 * @property {string} category - The category of the lost/found post.
 * @property {string} status - The status of the lost/found post.
 * @property {Date} createdAt - The timestamp when the post was created.
 * @property {Date} updatedAt - The timestamp when the post was last updated.
 */
const LostfoundPostSchema = new mongoose.Schema(
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
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LostfoundPost = mongoose.model(
  "LostfoundPost",
  LostfoundPostSchema
);
