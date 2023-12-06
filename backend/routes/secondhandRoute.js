import express from "express";
import { Secondhanditem } from "../models/secondhanditem.js";

const router = express.Router();

router.post("/secondhanditem", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.image ||
      !req.body.date ||
      !req.body.seller ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for secondhanditem");
    }

    const newSecondhanditem = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      seller: req.body.seller,
      category: req.body.category,
    };

    const secondhanditem = await Secondhanditem.create(newSecondhanditem);

    return res.status(201).send(secondhanditem);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/secondhanditem", async (req, res) => {
  try {
    const secondhanditems = await Secondhanditem.find({});

    return res.status(200).json(secondhanditems);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/secondhanditem/:id", async (req, res) => {
  try {
    const secondhanditem = await Secondhanditem.findById(req.params.id);

    if (!secondhanditem) {
      return res.status(404).send("Secondhanditem not found");
    }

    return res.status(200).json(secondhanditem);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/secondhanditem/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.image ||
      !req.body.date ||
      !req.body.seller ||
      !req.body.category
    ) {
      return res.status(400).send("Missing fields for secondhanditem");
    }

    const result = await Secondhanditem.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).send("Secondhanditem not found");
    }

    return res.status(204).send("Secondhanditem updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.delete("/secondhanditem/:id", async (req, res) => {
  try {
    const result = await Secondhanditem.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Secondhanditem not found");
    }

    return res.status(204).send("Secondhanditem deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export default router;