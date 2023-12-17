import { BorrowPost } from "../models/borrowpost.js";
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
    !reqBody.poster ||
    !reqBody.category
  ) {
    return false;
  }
  return true;
}

/**
 * Handles the POST request for creating a new borrow post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the borrow post is created.
 */
export const borrowPostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for borrowpost");
    }

    const newBorrowpost = req.body;

    const borrowpost = await BorrowPost.create(newBorrowpost);

    // Add post to the userProfile's ownposts
    const userId = borrowpost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostObject = {
      id: borrowpost._id,
      typename: "Borrow",
      title: borrowpost.title,
      offeredCourse: "",
      offeredSection: "",
      desiredCourse: "",
      desiredSection: "",
    };

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostObject } }
    );

    return res.status(201).send(borrowpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a list of borrow posts based on the provided search criteria.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the list of borrow posts.
 * @throws {Error} - If an error occurs while retrieving the borrow posts.
 */
export const borrowPostGET = async (req, res) => {
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

    const borrowposts = await BorrowPost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(borrowposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a specific borrow post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the borrow post is retrieved.
 */
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

/**
 * Updates a BorrowPost in the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the updated fields.
 * @param {string} req.params.id - The ID of the BorrowPost to be updated.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves to the updated BorrowPost or an error message.
 */
export const borrowPostPUT = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for borrowpost");
    }

    const result = await BorrowPost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("BorrowPost not found");
    }
    await updateOwnedPosts(
      req.body.title,
      result.title,
      result.poster,
      result._id,
      "Borrow"
    );

    return res.status(204).send("BorrowPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes a BorrowPost by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the BorrowPost is deleted.
 * @throws {Error} - If there is an error while deleting the BorrowPost.
 */
export const borrowPostDEL = async (req, res) => {
  try {
    const result = await BorrowPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("BorrowPost not found");
    }

    await deleteOwnedPosts(result.poster, req.params.id);

    return res.status(204).send("BorrowPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
