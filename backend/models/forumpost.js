import mongoose from "mongoose";

/**
 * @typedef {Object} ForumEntrySchema
 * @property {string} content - The content of the forum entry.
 * @property {string} poster - The username of the poster.
 * @property {Date} createdAt - The timestamp when the forum entry was created.
 * @property {Date} updatedAt - The timestamp when the forum entry was last updated.
 */
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

/**
 * @typedef {Object} ForumPostSchema
 * @property {string} poster - The username of the poster.
 * @property {string} title - The title of the forum post.
 * @property {string} description - The description of the forum post.
 * @property {Array<ForumEntrySchema>} entries - An array of forum entry objects.
 * @property {Date} createdAt - The timestamp when the forum post was created.
 * @property {Date} updatedAt - The timestamp when the forum post was last updated.
 */
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
    entries: {
      type: [ForumEntrySchema],
    },
  },
  {
    timestamps: true,
  }
);

export const ForumPost = mongoose.model("ForumPost", ForumPostSchema);
