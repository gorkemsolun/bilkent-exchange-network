import { Donatepost } from "../models/donatepost.js";

export const donatePostPOST = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const newDonatepost = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      poster: req.body.poster,
      category: req.body.category,
    };

    const donatepost = await Donatepost.create(newDonatepost);

    return res.status(201).send(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGET = async (req, res) => {
  try {
    const donateposts = await Donatepost.find({});

    return res.status(200).json(donateposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGETId = async (req, res) => {
  try {
    const donatepost = await Donatepost.findById(req.params.id);

    if (!donatepost) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(200).json(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostPUT = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for donatepost");
    }

    const result = await Donatepost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const donatePostDEL = async (req, res) => {
  try {
    const result = await Donatepost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
