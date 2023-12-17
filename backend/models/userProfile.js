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

/**
 * @typedef {Object} UserProfileSchema
 * @property {string} userID - The ID of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} image - The image URL of the user.
 * @property {string} description - The description of the user.
 * @property {number} reputation - The reputation score of the user.
 * @property {OwnPostSchema[]} ownPosts - The array of own posts by the user.
 * @property {SavedPostSchema[]} savedPosts - The array of saved posts by the user.
 * @property {Date} createdAt - The timestamp when the user profile was created.
 * @property {Date} updatedAt - The timestamp when the user profile was last updated.
 */
const UserProfileSchema = new mongoose.Schema(
  {
    userID: {
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
