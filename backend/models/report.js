import mongoose from "mongoose";

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
