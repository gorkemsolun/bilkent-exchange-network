import express from "express";
import { Secondhandpost } from "../models/secondhandpost.js";

const router = express.Router();

router.post("/secondhandpost", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const newSecondhandpost = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      poster: req.body.poster,
      category: req.body.category,
    };

    const secondhandpost = await Secondhandpost.create(newSecondhandpost);

    return res.status(201).send(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/secondhandpost", async (req, res) => {
  try {
    const secondhandposts = await Secondhandpost.find({});

    return res.status(200).json(secondhandposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/secondhandpost/:id", async (req, res) => {
  try {
    const secondhandpost = await Secondhandpost.findById(req.params.id);

    if (!secondhandpost) {
      return res.status(404).send("Secondhandpost not found");
    }

    return res.status(200).json(secondhandpost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/secondhandpost/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.image ||
      !req.body.date ||
      !req.body.poster ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for secondhandpost");
    }

    const result = await Secondhandpost.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Secondhandpost not found");
    }

    return res.status(204).send("Secondhandpost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.delete("/secondhandpost/:id", async (req, res) => {
  try {
    const result = await Secondhandpost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Secondhandpost not found");
    }

    return res.status(204).send("Secondhandpost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export default router;
