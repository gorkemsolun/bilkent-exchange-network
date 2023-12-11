import { Donatepost } from "../models/donatepost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category
  ) {
    return res.status(400).send("Missing fields for donatepost");
  }
}

export const donatePostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newDonatepost = req.body;
    const donatepost = await Donatepost.create(newDonatepost);

    return res.status(201).send(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGET = async (req, res) => {
  try {
    let query = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];

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

    const donateposts = await Donatepost.find(query);

    return res.status(200).json(donateposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGETId = async (req, res) => {
  try {
    const donatepost = await Donatepost.findById(req.params.id);

    if (!donatepost) {
      return res.status(404).send("Donatepost not found");
    }

    donatepost["date"] = donatepost.createdAt.toDateString();
    donatepost["id"] = donatepost._id;

    return res.status(200).json(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Donatepost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const donatePostDEL = async (req, res) => {
  try {
    const result = await Donatepost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
