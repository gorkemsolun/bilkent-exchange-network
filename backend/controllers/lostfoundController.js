import { LostfoundPost } from "../models/lostfoundpost.js";
import { UserProfile } from "../models/userProfile.js";
import { deleteOwnedPosts, updateOwnedPosts } from "./profileController.js";

/**
 * Checks if all required fields are present in the request body.
 * @param {object} reqBody - The request body object.
 * @returns {boolean} - Returns true if all required fields are present, false otherwise.
 */
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

/**
 * Handles the creation of a new lost and found post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created lost and found post.
 * @throws {Error} If there is an error during the creation process.
 */
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

/**
 * Retrieves lost and found posts based on specified filters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response containing the retrieved lost and found posts.
 * @throws {Error} - If an error occurs while retrieving the lost and found posts.
 */
export const lostfoundPostGET = async (req, res) => {
  try {
    let query = {};
    let sort = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];
    let status = req.params.status;
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
    if (status !== "All") {
      query.status = status;
    }
    if (sortType && sortType !== "All") {
      if (sortType === "date-desc") {
        sort.createdAt = -1;
      } else if (sortType === "date-asc") {
        sort.createdAt = 1;
      }
    }

    const lostfoundposts = await LostfoundPost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(lostfoundposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a specific LostfoundPost by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the LostfoundPost is retrieved.
 */
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

/**
 * Updates a lostfound post by ID.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the updated fields.
 * @param {string} req.params.id - The ID of the lostfound post to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the lostfound post is updated.
 * @throws {Error} - If there is an error during the update process.
 */
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
    await updateOwnedPosts(
      req.body.title,
      result.title,
      result.poster,
      result._id,
      "Lostfound"
    );
    return res.status(204).send("LostfoundPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes a LostfoundPost by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the LostfoundPost is deleted.
 */
export const lostfoundPostDEL = async (req, res) => {
  try {
    const result = await LostfoundPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("LostfoundPost not found");
    }
    await deleteOwnedPosts(result.poster, req.params.id);
    return res.status(204).send("LostfoundPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
