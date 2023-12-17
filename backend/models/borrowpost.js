import mongoose from "mongoose";

/**
 * @typedef BorrowPostSchema
 * @property {string} title - The title of the borrow post.
 * @property {string} description - The description of the borrow post.
 * @property {string} poster - The poster of the borrow post.
 * @property {string} category - The category of the borrow post.
 * @property {Date} createdAt - The timestamp when the borrow post was created.
 * @property {Date} updatedAt - The timestamp when the borrow post was last updated.
 */
const BorrowPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

export const BorrowPost = mongoose.model("BorrowPost", BorrowPostSchema);
