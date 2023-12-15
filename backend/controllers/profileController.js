import { UserProfile } from "../models/userProfile.js";

export const getProfileByUsersID = async (req, res) => {
  const _id = req.params.id;

  try {
    const profile = await UserProfile.findOne({ userID: _id });

    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

export const addOwnPost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("hollow body");
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

export const deleteOwnPost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("hollow body");
    }
    console.log("deleteOwnPost is running");
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

export const savePost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("hollow body");
    }
    const profileId = req.body._id;
    const newPost = req.body.newPost;
    await UserProfile.updateOne(
      { _id: profileId },
      { $push: { savedPosts: newPost } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const unSavePost = async (req, res) => {
  try {
    if (!req.body) {
      throw Error("hollow body");
    }
    const profileId = req.body._id;
    const toBeRemoved = req.body.toBeRemoved;
    await UserProfile.updateOne(
      { _id: profileId },
      { $pull: { savedPosts: toBeRemoved } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const updateOwnedPosts = async (reqBodyTitle, resultTitle, resultPoster, resultId, type) => {
  if ( reqBodyTitle && resultTitle !== reqBodyTitle) {
    const userId = resultPoster;
    const profile = await UserProfile.findOne({ userID: userId });

    const profileId = profile._id;
    const newPostObject = {
    id: resultId,
    typename: type,
    title: reqBodyTitle,
  };
  await UserProfile.updateOne(
    { _id: profileId, 'ownPosts.id': resultId },
    { $set: { 'ownPosts.$': newPostObject } }
    )
  }
}

//used when a post is deleted
export const deleteOwnedPosts = async (resultPoster, reqParamsId) => {
    const userId = resultPoster;
    const profile = await UserProfile.findOne({ userID: userId });

    await UserProfile.updateOne(
      { _id: profile._id },
      { $pull: { ownPosts: { id: reqParamsId } } })
}

export const updateOwnedSecExPost = async (reqBody, resultId, resultPoster) => {
  if ( reqBody ) {
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
    { _id: profileId, 'ownPosts.id': resultId },
    { $set: { 'ownPosts.$': newPostObject } },
    )
  }
}