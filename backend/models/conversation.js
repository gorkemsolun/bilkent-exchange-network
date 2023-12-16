import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    userIDs: [String],
    messages: [
      {
        userID: String,
        message: String,
        createdAt: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);
