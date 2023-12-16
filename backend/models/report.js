import mongoose from 'mongoose';

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
    postDetails: {
      title: String,
      description: String,
    },
    reporterDetails: {
      username: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model('Report', ReportSchema);
