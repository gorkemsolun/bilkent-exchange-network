import mongoose from "mongoose";

const OwnPostSchema = new mongoose.Schema({
  id: String,
  typename: String,
  title: String,
  offeredCourse: String,
  offeredSection: String,
  desiredCourse: String,
  desiredSection: String,
});

const SavedPostSchema = new mongoose.Schema({
  id: String,
  typename: String,
  title: String,
  offeredCourse: String,
  offeredSection: String,
  desiredCourse: String,
  desiredSection: String,
});

const UserProfileSchema = new mongoose.Schema(
  {
    userID: {
      // for the owner of this profile's ID
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    reputation: {
      type: Number,
    },
    ownPosts: {
      type: [OwnPostSchema],
      default: [],
    },
    savedPosts: {
      // for posts saved by this user
      type: [SavedPostSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserProfileSchema.statics.createProfile = async function (
  userID,
  username,
  email
) {
  const userProfile = await this.create({
    userID: userID,
    username: username,
    email: email,
  });

  return userProfile;
};

export const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
