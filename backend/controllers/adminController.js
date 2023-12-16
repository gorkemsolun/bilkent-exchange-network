import { Report} from '../models/report.js'

export const getReportedPosts = async (req, res) => {
  try {
    // Retrieve reported posts from the database
    const reportedPosts = await Report.find({});

    // Send the reported posts as the response
    res.json(reportedPosts);
  } catch (error) {
    console.error('Error fetching reported posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};