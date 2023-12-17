import mongoose from "mongoose";

/**
 * Represents the schema for a report in the database.
 *
 * @typedef {Object} ReportSchema
 * @property {string} postId - The ID of the post being reported.
 * @property {string} reason - The reason for the report.
 * @property {string} userId - The ID of the user who made the report.
 * @property {string} type - The type of the report.
 * @property {string} title - The title of the report.
 * @property {Date} createdAt - The timestamp when the report was created.
 * @property {Date} updatedAt - The timestamp when the report was last updated.
 */
const ReportSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", ReportSchema);
