import { ForumEntry, ForumPost } from "../models/forumpost.js";
import { UserProfile } from "../models/userProfile.js";
import { deleteOwnedPosts, updateOwnedPosts } from "./profileController.js";

/**
 * Checks if the required fields are present in the request body.
 * @param {Object} reqBody - The request body object.
 * @returns {boolean} - Returns true if all required fields are present, false otherwise.
 */
function fieldController(reqBody) {
  if (!reqBody.title || !reqBody.description || !reqBody.poster) {
    return false;
  }
  return true;
}

/**
 * Handles the creation of a new forum post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum post is created.
 * @throws {Error} - If there is an error during the creation process.
 */
export const forumPostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for forumpost");
    }

    const newForumpost = req.body;

    const forumpost = await ForumPost.create(newForumpost);

    // Add post to the userProfile's ownposts
    const userId = forumpost.poster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;

    const newPostObject = {
      id: forumpost._id,
      typename: "Forum",
      title: forumpost.title,
      offeredCourse: "",
      offeredSection: "",
      desiredCourse: "",
      desiredSection: "",
    };

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostObject } }
    );

    return res.status(201).send(forumpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Handles the creation of a new forum entry.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum entry is created.
 */
export const forumEntryPOST = async (req, res) => {
  try {
    if (!req.body.content || !req.body.poster) {
      return res.status(400).send("Missing fields for forumentry");
    }

    const newForumEntry = req.body;

    const forumentry = await ForumEntry.create(newForumEntry);
    const forumpost = await ForumPost.findById(req.params.id);

    if (!forumpost) {
      return res.status(404).send("ForumPost not found");
    }
    forumpost.entries.push(forumentry);
    await forumpost.save();

    return res.status(201).send(forumentry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Updates a forum entry.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum entry is updated.
 * @throws {Error} - If there is an error updating the forum entry.
 */
export const forumEntryPUT = async (req, res) => {
  try {
    const { id: postId, entryId } = req.params;
    const { content, poster } = req.body;

    const forumpost = await ForumPost.findById(postId);

    if (!forumpost) {
      return res.status(404).send("ForumPost not found");
    }

    // Find the entry in the entries array
    const entryToUpdate = forumpost.entries.id(entryId);

    if (!entryToUpdate) {
      return res.status(404).send("Entry not found");
    }

    // Update the entry fields
    entryToUpdate.content = content || entryToUpdate.content;
    entryToUpdate.poster = poster || entryToUpdate.poster;

    await forumpost.save();

    return res.status(200).send(entryToUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/**
 * Deletes a forum entry from a forum post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum entry is deleted.
 * @throws {Error} - If there is an error while deleting the forum entry.
 */
export const forumEntryDEL = async (req, res) => {
  try {
    const id = req.params.id;
    const entryId = req.params.entryId;

    const forumpost = await ForumPost.findById(id);

    if (!forumpost) {
      return res.status(404).send("ForumPost not found");
    }

    // Find the index of the entry in the entries array
    const entryIndex = forumpost.entries.findIndex(
      (entry) => entry._id == entryId
    );

    if (entryIndex === -1) {
      return res.status(404).send("Entry not found");
    }

    // Remove the entry from the entries array
    forumpost.entries.splice(entryIndex, 1);

    await forumpost.save();

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves forum posts based on the provided search parameters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the retrieved forum posts.
 * @throws {Error} - If an error occurs while retrieving the forum posts.
 */
export const forumPostGET = async (req, res) => {
  try {
    let query = {};
    let sort = {};
    let regexSearch = new RegExp(req.params.search, "i");
    let categories = req.params.categories.split(",");
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

    const forumposts = await ForumPost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(forumposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a forum post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum post is retrieved.
 */
export const forumPostGETId = async (req, res) => {
  try {
    const forumpost = await ForumPost.findById(req.params.id);

    if (!forumpost) {
      return res.status(404).send("ForumPost not found");
    }

    return res.status(200).json(forumpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Updates a forum post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the updated fields for the forum post.
 * @param {string} req.params.id - The ID of the forum post to be updated.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the forum post is updated.
 * @throws {Error} - If there is an error during the update process.
 */
export const forumPostPUT = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for forumpost");
    }

    const result = await ForumPost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("ForumPost not found");
    }

    await updateOwnedPosts(
      req.body.title,
      result.title,
      result.poster,
      result._id,
      "Forum"
    );

    return res.status(204).send("ForumPost updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Deletes a forum post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the forum post is deleted.
 */
export const forumPostDEL = async (req, res) => {
  try {
    const result = await ForumPost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("ForumPost not found");
    }
    await deleteOwnedPosts(result.poster, req.params.id);
    return res.status(204).send("ForumPost deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
