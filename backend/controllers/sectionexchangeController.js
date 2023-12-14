import { SectionexchangePost } from "../models/sectionexchangepost.js";
import { UserProfile } from "../models/userProfile.js";

function fieldController(reqBody) {
  if (
    !reqBody.price ||
    !reqBody.poster ||
    !reqBody.offeredSection ||
    !reqBody.desiredSection ||
    !reqBody.offeredCourse ||
    !reqBody.desiredCourse
  ) {
    return false;
  }
}

export const sectionexchangePostPOST = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for sectionexchangepost");
    }

    const newSectionexchangepost = req.body;

    const sectionexchangepost = await SectionexchangePost.create(
      newSectionexchangepost
    );

    // Add post to the userProfile's ownposts
    const userId = sectionexchangepost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostId = sectionexchangepost._id;
    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostId } }
    );

    return res.status(201).send(sectionexchangepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostGET = async (req, res) => {
  try {
    let query = {};
    let regexSearch = new RegExp(req.params.search, "i");
    let priceMin = req.params.price.split("*")[0],
      priceMax = req.params.price.split("*")[1];
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];

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
    if (req.params.offeredCourse !== "undefined") {
      query.offeredCourse = req.params.offeredCourse;
    }
    if (req.params.offeredSection !== "undefined") {
      query.offeredSection = Number(req.params.offeredSection);
    }
    if (req.params.desiredCourse !== "undefined") {
      query.desiredCourse = req.params.desiredCourse;
    }
    if (req.params.desiredSection !== "undefined") {
      query.desiredSection = Number(req.params.desiredSection);
    }

    const sectionexchangeposts = await SectionexchangePost.find(query);

    return res.status(200).json(sectionexchangeposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostGETId = async (req, res) => {
  try {
    const sectionexchangepost = await SectionexchangePost.findById(
      req.params.id
    );

    if (!sectionexchangepost) {
      return res.status(404).send("SectionexchangePost not found");
    }

    return res.status(200).json(sectionexchangepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostPUT = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for sectionexchangepost");
    }

    const result = await SectionexchangePost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("SectionexchangePost not found");
    }

    return res.status(204).send("SectionexchangePost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const sectionexchangePostDEL = async (req, res) => {
  try {
    const result = await SectionexchangePost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("SectionexchangePost not found");
    }

    return res.status(204).send("SectionexchangePost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
