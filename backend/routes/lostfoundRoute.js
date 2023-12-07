import express from "express";
import { Lostfoundpost } from "../models/lostfoundpost.js";

const router = express.Router();

router.post("/lostfoundpost", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for lostfoundpost");
    }

    const newLostfoundpost = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      poster: req.body.poster,
      category: req.body.category,
    };

    const lostfoundpost = await Lostfoundpost.create(newLostfoundpost);

    return res.status(201).send(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/lostfoundpost", async (req, res) => {
  try {
    const lostfoundposts = await Lostfoundpost.find({});

    return res.status(200).json(lostfoundposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/lostfoundpost/:id", async (req, res) => {
  try {
    const lostfoundpost = await Lostfoundpost.findById(req.params.id);

    if (!lostfoundpost) {
      return res.status(404).send("Lostfoundpost not found");
    }

    return res.status(200).json(lostfoundpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/lostfoundpost/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for lostfoundpost");
    }

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
});

router.delete("/lostfoundpost/:id", async (req, res) => {
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
});

export default router;
