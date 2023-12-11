import { Lostfoundpost } from "../models/lostfoundpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category ||
    !reqBody.status
  ) {
    return res.status(400).send("Missing fields for lostfoundpost");
  }
}

export const lostfoundPostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newLostfoundpost = req.body;

    const lostfoundpost = await Lostfoundpost.create(newLostfoundpost);

    return res.status(201).send(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostGET = async (req, res) => {
  try {
    let query = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];
    let status = req.params.status;

    if (!categories || !Array.isArray || categories[0] !== "all") {
      query.categories = { $in: categories };
    }
    if (req.params.search !== "all") {
      query.title = { $regex: regexSearch };
    }

    if (dateMin && dateMin !== "all" && dateMax !== "all" && dateMax) {
      query.timestamp = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "all" && dateMin) {
      query.timestamp = { $gte: dateMin };
    } else if (dateMax !== "all" && dateMax) {
      query.timestamp = { $lte: dateMax };
    }

    if (status !== "all") {
      query.status = status;
    }

    const lostfoundposts = await Lostfoundpost.find(query);

    return res.status(200).json(lostfoundposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostGETId = async (req, res) => {
  try {
    const lostfoundpost = await Lostfoundpost.findById(req.params.id);

    if (!lostfoundpost) {
      return res.status(404).send("Lostfoundpost not found");
    }

    lostfoundpost["date"] = lostfoundpost.createdAt.toDateString();
    lostfoundpost["id"] = lostfoundpost._id;

    return res.status(200).json(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Lostfoundpost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Lostfoundpost not found");
    }

    return res.status(204).send("Lostfoundpost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const lostfoundPostDEL = async (req, res) => {
  try {
    const result = await Lostfoundpost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Lostfoundpost not found");
    }

    return res.status(204).send("Lostfoundpost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};