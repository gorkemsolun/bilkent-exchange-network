import { DonatePost } from "../models/donatepost.js";
import { UserProfile } from "../models/userProfile.js";
import { deleteOwnedPosts, updateOwnedPosts } from "./profileController.js";

/**
 * Validates the required fields in the request body.
 * @param {Object} reqBody - The request body object.
 * @returns {boolean} - Returns true if all required fields are present, otherwise false.
 */
function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category
  ) {
    return false;
  }
  return true;
}

/**
 * Handles the creation of a new donate post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created donate post.
 * @throws {Error} If there is an error during the creation process.
 */
export const donatePostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const newDonatepost = req.body;
    const donatepost = await DonatePost.create(newDonatepost);

    // Add post to the userProfile's ownposts
    const userId = donatepost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;

    const newPostObject = {
      id: donatepost._id,
      typename: "Donate",
      title: donatepost.title,
      offeredCourse: "",
      offeredSection: "",
      desiredCourse: "",
      desiredSection: "",
    };

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostObject } }
    );

    return res.status(201).send(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves donate posts based on specified filters and sorting options.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response containing the retrieved donate posts.
 * @throws {Error} - If there is an error while retrieving the donate posts.
 */
export const donatePostGET = async (req, res) => {
  try {
    let query = {};
    let sort = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];
    let sortType = req.params.sort;

    if (!categories || !Array.isArray || categories[0] !== "All") {
      query.category = { $in: categories };
    }
    if (req.params.search !== "All") {
      query.title = { $regex: regexSearch };
    }
    if (dateMin && dateMin !== "All" && dateMax !== "All" && dateMax) {
      query.createdAt = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "All" && dateMin) {
      query.createdAt = { $gte: dateMin };
    } else if (dateMax !== "All" && dateMax) {
      query.createdAt = { $lte: dateMax };
    }
    if (sortType && sortType !== "All") {
      if (sortType === "date-desc") {
        sort.createdAt = -1;
      } else if (sortType === "date-asc") {
        sort.createdAt = 1;
      }
    }

    const donateposts = await DonatePost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(donateposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a specific donate post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the donate post is retrieved.
 */
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

/**
 * Updates a donate post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the donate post is updated.
 * @throws {Error} - If there is an error during the update process.
 */
export const donatePostPUT = async (req, res) => {
  try {
    if (fieldController(req.body)) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const result = await DonatePost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("DonatePost not found");
    }
    await updateOwnedPosts(
      req.body.title,
      result.title,
      result.poster,
      result._id,
      "Donate"
    );

    return res.status(204).send("DonatePost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes a donate post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the donate post is deleted.
 */
export const donatePostDEL = async (req, res) => {
  try {
    const result = await DonatePost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("DonatePost not found");
    }
    await deleteOwnedPosts(result.poster, req.params.id);

    return res.status(204).send("DonatePost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
