import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    userID: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model('Report', ReportSchema);
