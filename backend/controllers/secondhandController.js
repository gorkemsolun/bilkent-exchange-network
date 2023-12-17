import { SecondhandPost } from "../models/secondhandpost.js";
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
    !reqBody.price ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category
  ) {
    return false;
  }
  return true;
}

/**
 * Handles the creation of a new secondhand post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created secondhand post.
 */
export const secondhandPostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const newSecondhandpost = req.body;

    const secondhandpost = await SecondhandPost.create(newSecondhandpost);

    // Add post to the userProfile's ownposts
    const userId = secondhandpost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const newPostObject = {
      id: secondhandpost._id,
      typename: "Secondhand",
      title: secondhandpost.title,
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

    return res.status(201).send(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a secondhand post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the secondhand post is retrieved.
 */
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

/**
 * Retrieves a list of secondhand posts based on the provided search criteria.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The list of secondhand posts.
 * @throws {Error} - If an error occurs while retrieving the secondhand posts.
 */
export const secondhandPostGET = async (req, res) => {
  try {
    let query = {};
    let sort = {};
    let categories = req.params.categories.split(",");
    let regexSearch = new RegExp(req.params.search, "i");
    let priceMin = req.params.price.split("*")[0],
      priceMax = req.params.price.split("*")[1];
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];
    let sortType = req.params.sort;

    if (!categories || !Array.isArray || categories[0] !== "All") {
      query.category = { $in: categories };
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
      query.createdAt = { $gte: dateMin, $lte: dateMax };
    } else if (dateMin !== "All" && dateMin) {
      query.createdAt = { $gte: dateMin };
    } else if (dateMax !== "All" && dateMax) {
      query.createdAt = { $lte: dateMax };
    }
    if (sortType !== "All" && sortType) {
      if (sortType === "price-desc") {
        sort.price = -1;
      } else if (sortType === "price-asc") {
        sort.price = 1;
      } else if (sortType === "date-desc") {
        sort.createdAt = -1;
      } else if (sortType === "date-asc") {
        sort.createdAt = 1;
      }
    }

    const secondhandposts = await SecondhandPost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(secondhandposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Updates a secondhand post by ID.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the updated fields.
 * @param {string} req.params.id - The ID of the secondhand post to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated secondhand post or an error message.
 */
export const secondhandPostPUT = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const result = await SecondhandPost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("SecondhandPost not found");
    }
    await updateOwnedPosts(
      req.body.title,
      result.title,
      result.poster,
      result._id,
      "Secondhand"
    );
    return res.status(204).send("SecondhandPost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes a secondhand post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the post is deleted.
 * @throws {Error} - If there is an error while deleting the post.
 */
export const secondhandPostDEL = async (req, res) => {
  try {
    const result = await SecondhandPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("SecondhandPost not found");
    }
    await deleteOwnedPosts(result.poster, req.params.id);
    return res.status(204).send("SecondhandPost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
