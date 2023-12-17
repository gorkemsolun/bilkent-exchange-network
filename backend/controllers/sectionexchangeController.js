import { SectionexchangePost } from "../models/sectionexchangepost.js";
import { UserProfile } from "../models/userProfile.js";
import { deleteOwnedPosts, updateOwnedSecExPost } from "./profileController.js";

/**
 * Checks if all required fields are present in the request body.
 * @param {Object} reqBody - The request body object.
 * @returns {boolean} - Returns true if all required fields are present, false otherwise.
 */
function fieldController(reqBody) {
  if (
    !reqBody.poster ||
    !reqBody.offeredSection ||
    !reqBody.desiredSection ||
    !reqBody.offeredCourse ||
    !reqBody.desiredCourse
  ) {
    return false;
  }
  return true;
}

/**
 * Handles the POST request for creating a new section exchange post.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created section exchange post.
 * @throws {Error} - If there is an error while creating the post.
 */
export const sectionexchangePostPOST = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
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

    const newPostObject = {
      id: sectionexchangepost._id,
      typename: "SectionExchange",
      title: sectionexchangepost.title,
      offeredCourse: sectionexchangepost.offeredCourse,
      offeredSection: sectionexchangepost.offeredSection,
      desiredCourse: sectionexchangepost.desiredCourse,
      desiredSection: sectionexchangepost.desiredSection,
    };

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPostObject } }
    );

    return res.status(201).send(sectionexchangepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves section exchange posts based on the provided search parameters.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters sent with the request.
 * @param {string} req.params.search - The search keyword.
 * @param {string} req.params.price - The price range.
 * @param {string} req.params.date - The date range.
 * @param {string} req.params.sort - The sorting type.
 * @param {string} req.params.offeredCourse - The offered course.
 * @param {string} req.params.offeredSection - The offered section.
 * @param {string} req.params.desiredCourse - The desired course.
 * @param {string} req.params.desiredSection - The desired section.
 * @param {number} req.params.page - The page number.
 * @param {number} req.params.limit - The number of posts to retrieve per page.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved section exchange posts.
 * @throws {Error} - If an error occurs while retrieving the posts.
 */
export const sectionexchangePostGET = async (req, res) => {
  try {
    let query = {};
    let sort = {};
    let regexSearch = new RegExp(req.params.search, "i");
    let priceMin = req.params.price.split("*")[0],
      priceMax = req.params.price.split("*")[1];
    let dateMin = req.params.date.split("*")[0],
      dateMax = req.params.date.split("*")[1];
    let sortType = req.params.sort;

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
    if (req.params.offeredCourse !== "All") {
      query.offeredCourse = req.params.offeredCourse;
    }
    if (req.params.offeredSection !== "undefined") {
      query.offeredSection = Number(req.params.offeredSection);
    }
    if (req.params.desiredCourse !== "All") {
      query.desiredCourse = req.params.desiredCourse;
    }
    if (req.params.desiredSection !== "undefined") {
      query.desiredSection = Number(req.params.desiredSection);
    }
    if (sortType && sortType !== "All") {
      if (sortType === "date-desc") {
        sort.createdAt = -1;
      } else if (sortType === "date-asc") {
        sort.createdAt = 1;
      }
    }

    const sectionexchangeposts = await SectionexchangePost.find(query)
      .sort(sort)
      .skip(req.params.page * req.params.limit)
      .limit(req.params.limit);

    return res.status(200).json(sectionexchangeposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Retrieves a section exchange post by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the section exchange post is retrieved.
 */
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

/**
 * Updates a section exchange post by ID.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the updated post data.
 * @param {string} req.params.id - The ID of the section exchange post to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the post is updated.
 */
export const sectionexchangePostPUT = async (req, res) => {
  try {
    if (!fieldController(req.body)) {
      return res.status(400).send("Missing fields for sectionexchangepost");
    }

    const result = await SectionexchangePost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).send("SectionexchangePost not found");
    }

    await updateOwnedSecExPost(req.body, result._id, result.poster);

    return res.status(204).send("SectionexchangePost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes a SectionexchangePost by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the SectionexchangePost is deleted.
 * @throws {Error} - If there is an error while deleting the SectionexchangePost.
 */
export const sectionexchangePostDEL = async (req, res) => {
  try {
    const result = await SectionexchangePost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("SectionexchangePost not found");
    }
    await deleteOwnedPosts(result.poster, req.params.id);
    return res.status(204).send("SectionexchangePost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
