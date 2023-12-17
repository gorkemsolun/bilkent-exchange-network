import { Report } from "../models/report.js";

/**
 * Retrieves the reported posts from the database and sends them as the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the reported posts are sent as the response.
 * @throws {Error} - If there is an error fetching the reported posts.
 */
export const getReportedPosts = async (req, res) => {
  try {
    // Retrieve reported posts from the database
    const reportedPosts = await Report.find({});

    // Send the reported posts as the response
    res.json(reportedPosts);
  } catch (error) {
    console.error("Error fetching reported posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Reports a post and saves the report information to the database.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the post information.
 * @param {string} req.body.postId - The ID of the post being reported.
 * @param {string} req.body.reason - The reason for reporting the post.
 * @param {string} req.body.userId - The ID of the user reporting the post.
 * @param {string} req.body.type - The type of the post being reported.
 * @param {string} req.body.title - The title of the post being reported.
 * @param {Object} res - The response object.
 * @returns {Object} - The response indicating the successful report or an error message.
 */
export const reportPost = async (req, res) => {
  console.log(req.body);
  var { postId, reason, userId, type, title } = req.body;

  try {
    // Save the report information to the database using the Report model
    const newReport = await Report.create({
      postId,
      reason,
      userId,
      type,
      title,
    });
    // Send a response indicating successful report
    return res.status(201).send(newReport);
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
