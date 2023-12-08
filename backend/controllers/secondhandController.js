import { Secondhandpost } from "../models/secondhandpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.price ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.categories
  ) {
    return res.status(400).send("Missing fields for secondhandpost");
  }
}

export const secondhandPostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newSecondhandpost = req.body;

    const secondhandpost = await Secondhandpost.create(newSecondhandpost);

    return res.status(201).send(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const secondhandPostGET = async (req, res) => {
  try {
    const secondhandposts = await Secondhandpost.find({});

    secondhandposts.forEach((secondhandpost) => {
      secondhandpost["date"] = secondhandpost.createdAt.toDateString();
      secondhandpost["id"] = secondhandpost._id;
    });

    return res.status(200).json(secondhandposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const secondhandPostGETId = async (req, res) => {
  try {
    const secondhandpost = await Secondhandpost.findById(req.params.id);

    if (!secondhandpost) {
      return res.status(404).send("Secondhandpost not found");
    }

    secondhandpost["date"] = secondhandpost.createdAt.toDateString();
    secondhandpost["id"] = secondhandpost._id;

    return res.status(200).json(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const secondhandPostGETByCategories = async (req, res) => {
  try {
    let query = {};
    const categories = req.params.categories.split(",");
    console.log(categories);

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).send("Missing categories");
    }

    // Build the query using an OR operator to include posts from any of the provided categories
    query = { categories: { $in: categories } };

    const posts = await Secondhandpost.find(query);

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const secondhandPostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Secondhandpost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Secondhandpost not found");
    }

    return res.status(204).send("Secondhandpost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const secondhandPostDEL = async (req, res) => {
  try {
    const result = await Secondhandpost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Secondhandpost not found");
    }

    return res.status(204).send("Secondhandpost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
