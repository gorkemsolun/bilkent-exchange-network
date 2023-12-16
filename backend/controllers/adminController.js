import { Report } from "../models/report.js";
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

export const reportPost = async (req, res) => {
  var { postId, reason, userId } = req.body;

  try {
    const newReport = await Report.create({ postId, reason, userId });

    return res.status(201).send(newReport);
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
