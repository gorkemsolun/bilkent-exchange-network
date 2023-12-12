import { UserProfile } from "../models/userProfile.js"

function fieldTracker(reqBody, profile) { 
    //When updated, we will only get one or more updates but we only use 1 method to update
    //so we will get the previously filled areas and put them into the req body 
    //so that we don't lose the unchanged fields when updated because they will be null inside the request
    
    //these fields cannot be changed
    reqBody.userID = profile.userID
    reqBody.username = profile.username   
    reqBody.email = profile.email
    //these fields can be changed but not in this function
    reqBody.ownPosts = profile.ownPosts
    reqBody.savedPosts = profile.savedPosts
    //these fields can change
    if (!reqBody.name){
        reqBody.name = profile.name
    }
    if (!reqBody.image) {
        reqBody.image = profile.image
    }
    if (!reqBody.bio) {
        reqBody.bio = profile.bio
    }
  }

export const getProfileByUsersID = async(req, res) => {
    const _id = req.params.id
    
    try {
       
        const profile = await UserProfile.findOne({userID: _id})
        
       
        res.status(200).json({profile});
    
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const getProfileByUsername = async(req, res) => { //this is for searching profiles we can separate name and username search
    try {
        let query = {};
        let regexSearch = new RegExp(req.params.search, "i");
        if (req.params.search !== "All") {
            query.username = { $regex: regexSearch };
        }
        
        const profile = await UserProfile.find({query})
        
        if (!profile) { //if we cannot find anything by username then search for name?
            nameQuery = {}
            nameQuery.name = { $regex: regexSearch };
            profile = await UserProfile.find({nameQuery})
        }

        res.status(200).json({profile});
    
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const profileUpdate = async (req, res) => {
    try {
      const profile = await UserProfile.find({userID: req.body._id})
      if (!profile) {
        return res.status(404).send("Profile not found");
      }
      fieldTracker(req.body, profile)


      const result = await UserProfile.findByIdAndUpdate(
        req.body._id,
        req.body
      );
  
      return res.status(200).json({result});
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

export const addOwnPost = async (req, res) => {
    try {
        if (!req.body) {
            throw Error("hollow body")
        }
        profileId = req.body._id
        newPost = req.body.newPost
        await UserProfile.updateOne({ _id: profileId }, { $push: { ownPosts: newPost } });

        return res.status(200).json({profile});
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}

export const deleteOwnPost = async (req, res) => {
    try {
        if (!req.body) {
            throw Error("hollow body")
        }
        profileId = req.body._id
        toBeRemoved = req.body.toBeRemoved
        await UserProfile.updateOne({ _id: profileId }, { $pull: { ownPosts: toBeRemoved } });

        return res.status(200).json({profile});
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}

export const savePost = async (req, res) => {
    try {
        if (!req.body) {
            throw Error("hollow body")
        }
        profileId = req.body._id
        newPost = req.body.newPost
        await UserProfile.updateOne({ _id: profileId }, { $push: { savedPosts: newPost } });

        return res.status(200).json({profile});
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}

export const unSavePost = async (req, res) => {
    try {
        if (!req.body) {
            throw Error("hollow body")
        }
        profileId = req.body._id
        toBeRemoved = req.body.toBeRemoved
        await UserProfile.updateOne({ _id: profileId }, { $pull: { savedPosts: toBeRemoved } });

        return res.status(200).json({profile});
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
}
