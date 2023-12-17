import { Conversation } from "../models/conversation.js";

/**
 * Handles the POST request for creating a new conversation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created conversation.
 */
export const conversationPOST = async (req, res) => {
  try {
    const conversation = new Conversation(req.body);

    await conversation.save();

    return res.status(201).json(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Retrieves conversations by user ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved conversations or an error response.
 */
export const conversationGETByUserID = async (req, res) => {
  try {
    let query = {};

    query.userIDs = { $in: [req.params.id] };

    const conversations = await Conversation.find(query);

    if (!conversations) {
      return res.status(404).send("Conversation not found");
    }

    return res.status(200).json(conversations);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Get a conversation by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the conversation or an error response.
 */
export const conversationGETByID = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }

    return res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Updates a conversation by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the conversation is updated.
 */
export const conversationPUTUpdate = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }

    return res.status(204).json(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
