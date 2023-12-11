import { Sectionexchangepost } from "../models/sectionexchangepost.js";

function fieldController(reqBody) {
  if (
    !reqBody.username ||
    !reqBody.poster ||
    !reqBody.offeredSection ||
    !reqBody.desiredSection ||
    !reqBody.offeredCourse ||
    !reqBody.desiredCourse
  ) {
    return res.status(400).send("Missing fields for sectionexchangepost");
  }
}

export const sectionexchangePostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newSectionexchangepost = req.body;

    const sectionexchangepost = await Sectionexchangepost.create(
      newSectionexchangepost
    );

    return res.status(201).send(sectionexchangepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostGET = async (req, res) => {
  try {
    const sectionexchangeposts = await Sectionexchangepost.find({});

    sectionexchangeposts.forEach((sectionexchangepost) => {
      sectionexchangepost["date"] =
        sectionexchangepost.createdAt.toDateString();
      sectionexchangepost["id"] = sectionexchangepost._id;
    });

    return res.status(200).json(sectionexchangeposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostGETId = async (req, res) => {
  try {
    const sectionexchangepost = await Sectionexchangepost.findById(
      req.params.id
    );

    if (!sectionexchangepost) {
      return res.status(404).send("Sectionexchangepost not found");
    }

    sectionexchangepost["date"] = sectionexchangepost.createdAt.toDateString();
    sectionexchangepost["id"] = sectionexchangepost._id;

    return res.status(200).json(sectionexchangepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const sectionexchangePostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Sectionexchangepost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Sectionexchangepost not found");
    }

    return res.status(204).send("Sectionexchangepost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const sectionexchangePostDEL = async (req, res) => {
  try {
    const result = await Sectionexchangepost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Sectionexchangepost not found");
    }

    return res.status(204).send("Sectionexchangepost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const sectionPostGETSearch = async (req, res) => {
  try {
    const searchString = req.params.string;
    const regex = new RegExp(searchString, "i");
    const sectionPosts = await Sectionexchangepost.find({ title: regex });
    return res.status(200).json(sectionPosts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
