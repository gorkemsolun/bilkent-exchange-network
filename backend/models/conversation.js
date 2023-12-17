import mongoose from "mongoose";

/**
 * @typedef {import('mongoose').Schema} Schema
 * @typedef {import('mongoose').Model} Model
 */

/**
 * @typedef {Object} Conversation
 * @property {string[]} userIDs - The IDs of the users involved in the conversation.
 * @property {Object[]} messages - The messages in the conversation.
 * @property {string} messages.userID - The ID of the user who sent the message.
 * @property {string} messages.message - The content of the message.
 * @property {string} messages.createdAt - The timestamp when the message was created.
 */

/**
 * @type {Schema}
 */
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
