import { Conversation } from "../models/conversation.js";

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
