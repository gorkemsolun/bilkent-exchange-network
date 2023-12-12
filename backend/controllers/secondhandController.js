import { SecondhandPost } from "../models/secondhandpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.price ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.categories
  ) {
    return false;
  }
}

export const secondhandPostPOST = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const newSecondhandpost = req.body;
    console.log(newSecondhandpost);

    const secondhandpost = await SecondhandPost.create(newSecondhandpost);

    return res.status(201).send(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const secondhandPostGETId = async (req, res) => {
  try {
    const secondhandpost = await SecondhandPost.findById(req.params.id);

    if (!secondhandpost) {
      return res.status(404).send("SecondhandPost not found");
    }

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

    if (!categories || !Array.isArray || categories[0] !== "All") {
      query.categories = { $in: categories };
    }
    if (req.params.search !== "All") {
      query.title = { $regex: regexSearch };
    }
    if (priceMin !== "All" && priceMax !== "All" && priceMin && priceMax) {
      query.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin !== "All" && priceMin) {
      query.price = { $gte: priceMin };
    } else if (priceMax !== "All" && priceMax) {
      query.price = { $lte: priceMax };
    }
    if (dateMin && dateMin !== "All" && dateMax !== "All" && dateMax) {
      query.timestamp = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "All" && dateMin) {
      query.timestamp = { $gte: dateMin };
    } else if (dateMax !== "All" && dateMax) {
      query.timestamp = { $lte: dateMax };
    }

    const secondhandposts = await SecondhandPost.find(query);

    return res.status(200).json(secondhandposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const secondhandPostPUT = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const result = await SecondhandPost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("SecondhandPost not found");
    }

    return res.status(204).send("SecondhandPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const secondhandPostDEL = async (req, res) => {
  try {
    const result = await SecondhandPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("SecondhandPost not found");
    }

    return res.status(204).send("SecondhandPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
