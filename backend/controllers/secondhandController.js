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

export const secondhandPostGET = async (req, res) => {
  try {
    let query = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let priceMin = req.params.price.split("*")[0],
      priceMax = req.params.price.split("*")[1];
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];

    if (!categories || !Array.isArray || categories[0] !== "all") {
      query.categories = { $in: categories };
    }
    if (req.params.search !== "all") {
      query.title = { $regex: regexSearch };
    }
    if (priceMin !== "all" && priceMax !== "all" && priceMin && priceMax) {
      query.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin !== "all" && priceMin) {
      query.price = { $gte: priceMin };
    } else if (priceMax !== "all" && priceMax) {
      query.price = { $lte: priceMax };
    }
    if (dateMin && dateMin !== "all" && dateMax !== "all" && dateMax) {
      query.timestamp = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "all" && dateMin) {
      query.timestamp = { $gte: dateMin };
    } else if (dateMax !== "all" && dateMax) {
      query.timestamp = { $lte: dateMax };
    }

    const secondhandposts = await Secondhandpost.find(query);

    return res.status(200).json(secondhandposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
