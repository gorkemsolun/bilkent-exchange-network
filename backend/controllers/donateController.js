import { DonatePost } from "../models/donatepost.js";
import { UserProfile } from "../models/userProfile.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.categories
  ) {
    return false;
  }
}

export const donatePostPOST = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const newDonatepost = req.body;
    const donatepost = await DonatePost.create(newDonatepost);

    // Add post to the userProfile's ownposts
    const userId = donatepost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostId = donatepost._id;
    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostId } }
    );

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

    const donateposts = await DonatePost.find(query)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(donateposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGETId = async (req, res) => {
  try {
    const donatepost = await DonatePost.findById(req.params.id);

    if (!donatepost) {
      return res.status(404).send("DonatePost not found");
    }

    return res.status(200).json(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostPUT = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const result = await DonatePost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("DonatePost not found");
    }

    return res.status(204).send("DonatePost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const donatePostDEL = async (req, res) => {
  try {
    const result = await DonatePost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("DonatePost not found");
    }

    return res.status(204).send("DonatePost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
