import { Borrowpost } from "../models/borrowpost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.date ||
    !reqBody.poster ||
    !reqBody.category
  ) {
    return res.status(400).send("Missing fields for borrowpost");
  }
}

export const borrowPostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newBorrowpost = req.body;

    const borrowpost = await Borrowpost.create(newBorrowpost);

    return res.status(201).send(borrowpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostGET = async (req, res) => {
  try {
    const borrowposts = await Borrowpost.find({});

    return res.status(200).json(borrowposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostGETId = async (req, res) => {
  try {
    const borrowpost = await Borrowpost.findById(req.params.id);

    if (!borrowpost) {
      return res.status(404).send("Borrowpost not found");
    }

    return res.status(200).json(borrowpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const borrowPostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Borrowpost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("Borrowpost not found");
    }

    return res.status(204).send("Borrowpost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const borrowPostDEL = async (req, res) => {
  try {
    const result = await Borrowpost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Borrowpost not found");
    }

    return res.status(204).send("Borrowpost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
