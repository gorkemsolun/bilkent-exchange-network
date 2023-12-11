import mongoose from "mongoose";

const DonatepostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Donatepost = mongoose.model("Donatepost", DonatepostSchema);
