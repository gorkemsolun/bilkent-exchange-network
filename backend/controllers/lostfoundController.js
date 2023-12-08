import { Lostfoundpost } from "../models/lostfoundpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.poster ||
    !reqBody.category ||
    !reqBody.status
  ) {
    return res.status(400).send("Missing fields for lostfoundpost");
  }
}

export const lostfoundPostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newLostfoundpost = req.body;

    const lostfoundpost = await Lostfoundpost.create(newLostfoundpost);

    return res.status(201).send(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostGET = async (req, res) => {
  try {
    const lostfoundposts = await Lostfoundpost.find({});

    lostfoundposts.forEach((lostfoundpost) => {
      lostfoundpost["date"] = lostfoundpost.createdAt.toDateString();
      lostfoundpost["id"] = lostfoundpost._id;
    });

    return res.status(200).json(lostfoundposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostGETId = async (req, res) => {
  try {
    const lostfoundpost = await Lostfoundpost.findById(req.params.id);

    if (!lostfoundpost) {
      return res.status(404).send("Lostfoundpost not found");
    }

    lostfoundpost["date"] = lostfoundpost.createdAt.toDateString();
    lostfoundpost["id"] = lostfoundpost._id;

    return res.status(200).json(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const lostfoundPostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Lostfoundpost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Lostfoundpost not found");
    }

    return res.status(204).send("Lostfoundpost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const lostfoundPostDEL = async (req, res) => {
  try {
    const result = await Lostfoundpost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Lostfoundpost not found");
    }

    return res.status(204).send("Lostfoundpost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const lostfoundPostGETSearch = async (req, res) => {
  try {
    const searchString = req.params.string;
    const regex = new RegExp(searchString, 'i');
    const posts = await Lostfoundpost.find({title: regex});
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};