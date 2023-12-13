import mongoose from "mongoose";

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
    name: {
      type: String,
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
      // for this user's posts
      type: [String],
      default: [],
    },
    savedPosts: {
      // for posts saved by this user
      type: [String],
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
