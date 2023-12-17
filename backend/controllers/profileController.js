import { UserProfile } from "../models/userProfile.js";

/**
 * Retrieves a user profile by their ID.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object containing the user ID.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the profile is retrieved and sent as a JSON response.
 * @throws {Error} - If there is an error retrieving the profile, an error message is sent as a JSON response.
 */
export const getProfileByUsersID = async (req, res) => {
  const _id = req.params.id;

  try {
    const profile = await UserProfile.findOne({ userID: _id });

    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves a profile by username or name search.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the profile is retrieved.
 */
export const getProfileByUsername = async (req, res) => {
  //this is for searching profiles we can separate name and username search
  try {
    let query = {};
    let regexSearch = new RegExp(req.params.search, "i");

    if (req.params.search !== "All") {
      query.username = { $regex: regexSearch };
    }

    const profile = await UserProfile.find({ query });

    if (!profile) {
      //if we cannot find anything by username then search for name?
      nameQuery = {};
      nameQuery.name = { $regex: regexSearch };
      profile = await UserProfile.find({ nameQuery });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Updates a user profile.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the user ID and profile data.
 * @param {string} req.body.userID - The ID of the user whose profile is being updated.
 * @param {string} req.body._id - The ID of the profile being updated.
 * @param {Object} res - The response object.
 * @returns {Object} The updated profile.
 * @throws {Error} If an error occurs while updating the profile.
 */
export const profileUpdate = async (req, res) => {
  try {
    const profile = await UserProfile.find({ userID: req.body.userID });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    const result = await UserProfile.findByIdAndUpdate(req.body._id, req.body);

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Adds a new post to the ownPosts array of a user's profile.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body._id - The ID of the user's profile.
 * @param {Object} req.body.newPost - The new post to be added.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with status 200 if successful, or status 500 if an error occurs.
 */
export const addOwnPost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("Request body is empty");
    }

    const profileId = req.body._id;
    const newPost = req.body.newPost;

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { ownPosts: newPost } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Deletes the specified post from the user's ownPosts array in the UserProfile document.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body._id - The profile ID.
 * @param {string} req.body.toBeRemoved - The post ID to be removed.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with status 200 and an empty JSON object if successful, or an error response with status 500 if an error occurs.
 */
export const deleteOwnPost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("Request body is empty");
    }

    const profileId = req.body._id;
    const toBeRemoved = req.body.toBeRemoved;

    await UserProfile.updateOne(
      { _id: profileId },
      { $pull: { ownPosts: toBeRemoved } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Saves a post to a user's profile.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 * @throws {Error} - If the request body is empty.
 */
export const savePost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("Request body is empty");
    }

    const typeName = req.body.typename;
    const profileId = req.body.profileID;
    const savedPost = req.body.savedPost;

    const preparedPost = {
      id: savedPost._id,
      typename: typeName,
      title: savedPost.title,
      offeredCourse: savedPost.offeredCourse,
      offeredSection: savedPost.offeredSectio,
      desiredCourse: savedPost.desiredCourse,
      desiredSection: savedPost.desiredSection,
    };

    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { savedPosts: preparedPost } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Removes a saved post from a user's profile.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.profileID - The ID of the user's profile.
 * @param {Object} req.body.savedPost - The saved post to be removed.
 * @param {string} req.body.savedPost._id - The ID of the saved post to be removed.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with status 200 and an empty JSON body if successful, or an error response with status 500 if an error occurs.
 */
export const unSavePost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("Request body is empty");
    }

    const profileId = req.body.profileID;
    const toBeRemovedId = req.body.savedPost._id;

    await UserProfile.updateOne(
      { _id: profileId },
      { $pull: { savedPosts: { _id: toBeRemovedId } } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Updates the owned posts of a user's profile.
 * @param {string} reqBodyTitle - The title from the request body.
 * @param {string} resultTitle - The title from the result.
 * @param {string} resultPoster - The poster from the result.
 * @param {string} resultId - The ID from the result.
 * @param {string} type - The type of the post.
 * @returns {Promise<void>} - A promise that resolves when the owned posts are updated.
 */
export const updateOwnedPosts = async (
  reqBodyTitle,
  resultTitle,
  resultPoster,
  resultId,
  type
) => {
  if (reqBodyTitle && resultTitle !== reqBodyTitle) {
    const userId = resultPoster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostObject = {
      id: resultId,
      typename: type,
      title: reqBodyTitle,
    };

    await UserProfile.updateOne(
      { _id: profileId, "ownPosts.id": resultId },
      { $set: { "ownPosts.$": newPostObject } }
    );
  }
};

/**
 * Deletes the owned posts of a user.
 * @param {string} resultPoster - The ID of the user who owns the posts.
 * @param {string} reqParamsId - The ID of the post to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the posts are deleted.
 */
export const deleteOwnedPosts = async (resultPoster, reqParamsId) => {
  const userId = resultPoster;
  const profile = await UserProfile.findOne({ userID: userId });

  await UserProfile.updateOne(
    { _id: profile._id },
    { $pull: { ownPosts: { id: reqParamsId } } }
  );
};

/**
 * Updates the owned section exchange post in the user's profile.
 *
 * @param {Object} reqBody - The request body containing the updated post details.
 * @param {string} resultId - The ID of the post to be updated.
 * @param {string} resultPoster - The ID of the user who posted the original post.
 * @returns {Promise<void>} - A promise that resolves when the post is successfully updated.
 */
export const updateOwnedSecExPost = async (reqBody, resultId, resultPoster) => {
  if (reqBody) {
    const userId = resultPoster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostObject = {
      id: resultId,
      typename: "SectionExchange",
      title: reqBody.title,
      offeredCourse: reqBody.offeredCourse,
      offeredSection: reqBody.offeredSection,
      desiredCourse: reqBody.desiredCourse,
      desiredSection: reqBody.desiredSection,
    };

    await UserProfile.updateOne(
      { _id: profileId, "ownPosts.id": resultId },
      { $set: { "ownPosts.$": newPostObject } }
    );
  }
};
