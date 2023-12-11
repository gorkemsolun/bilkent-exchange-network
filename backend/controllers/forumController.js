import { ForumPost } from "../models/forumpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.poster ||
    !reqBody.categories
  ) {
    return res.status(400).send("Missing fields for forumpost");
  }
}

export const forumPostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newForumpost = req.body;

    const forumpost = await ForumPost.create(newForumpost);

    return res.status(201).send(forumpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const forumPostGET = async (req, res) => {
  try {
    let query = {};
    let regexSearch = new RegExp(req.params.search, "i");
    let categories = req.params.categories.split(",");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];

    if (!categories || !Array.isArray || categories[0] !== "All") {
      query.categories = { $in: categories };
    }
    if (req.params.search !== "All") {
      query.title = { $regex: regexSearch };
    }
    if (dateMin && dateMin !== "All" && dateMax !== "All" && dateMax) {
      query.timestamp = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "All" && dateMin) {
      query.timestamp = { $gte: dateMin };
    } else if (dateMax !== "All" && dateMax) {
      query.timestamp = { $lte: dateMax };
    }

    const forumposts = await ForumPost.find(query);

    return res.status(200).json(forumposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const forumPostGETId = async (req, res) => {
  try {
    const forumpost = await ForumPost.findById(req.params.id);

    if (!forumpost) {
      return res.status(404).send("ForumPost not found");
    }

    return res.status(200).json(forumpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const forumPostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await ForumPost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("ForumPost not found");
    }

    return res.status(204).send("ForumPost updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const forumPostDEL = async (req, res) => {
  try {
    const result = await ForumPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("ForumPost not found");
    }

    return res.status(204).send("ForumPost deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
