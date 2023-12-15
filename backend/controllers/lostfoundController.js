import { LostfoundPost } from "../models/lostfoundpost.js";
import { UserProfile } from "../models/userProfile.js";
import { deleteOwnedPosts, updateOwnedPosts } from "./profileController.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category ||
    !reqBody.status
  ) {
    return false;
  }
  return true;
}

export const lostfoundPostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      res.status(400).send("Missing fields for lostfoundpost");
    }

    const newLostfoundpost = req.body;

    const lostfoundpost = await LostfoundPost.create(newLostfoundpost);

    // Add post to the userProfile's ownposts
    const userId = lostfoundpost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const newPostObject = {
      id: lostfoundpost._id,
      typename: "LostFound",
      title: lostfoundpost.title,
      offeredCourse: "",
      offeredSection: "",
      desiredCourse: "",
      desiredSection: "",
    };

    const profileId = profile._id;
    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostObject } }
    );

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

    if (status !== "All") {
      query.status = status;
    }

    const lostfoundposts = await LostfoundPost.find(query)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(lostfoundposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostGETId = async (req, res) => {
  try {
    const lostfoundpost = await LostfoundPost.findById(req.params.id);

    if (!lostfoundpost) {
      return res.status(404).send("LostfoundPost not found");
    }

    return res.status(200).json(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostPUT = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      res.status(400).send("Missing fields for lostfoundpost");
    }

    const result = await LostfoundPost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("LostfoundPost not found");
    }
    await updateOwnedPosts(req.body.title, result.title, result.poster, result._id, "Lostfound");
    return res.status(204).send("LostfoundPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const lostfoundPostDEL = async (req, res) => {
  try {
    const result = await LostfoundPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("LostfoundPost not found");
    }
<<<<<<< HEAD

    deleteOwnedPosts(result.poster, req.params.id);

=======
    await deleteOwnedPosts(result.poster, req.params.id)
>>>>>>> 6147682 (optimization)
    return res.status(204).send("LostfoundPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
