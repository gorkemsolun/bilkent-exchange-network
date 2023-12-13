import { BorrowPost } from "../models/borrowpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.poster ||
    !reqBody.categories
  ) {
    return false;
  }
}

export const borrowPostPOST = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for borrowpost");
    }

    const newBorrowpost = req.body;

    const borrowpost = await BorrowPost.create(newBorrowpost);

    return res.status(201).send(borrowpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostGET = async (req, res) => {
  try {
    let query = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];

    if (!categories || !Array.isArray || categories[0] !== "All") {
      query.category = { $in: categories };
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

    const borrowposts = await BorrowPost.find(query);

    return res.status(200).json(borrowposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostGETId = async (req, res) => {
  try {
    const borrowpost = await BorrowPost.findById(req.params.id);

    if (!borrowpost) {
      return res.status(404).send("BorrowPost not found");
    }

    return res.status(200).json(borrowpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostPUT = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for borrowpost");
    }

    const result = await BorrowPost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("BorrowPost not found");
    }

    return res.status(204).send("BorrowPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const borrowPostDEL = async (req, res) => {
  try {
    const result = await BorrowPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("BorrowPost not found");
    }

    return res.status(204).send("BorrowPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
