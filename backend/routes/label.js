const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Label = require("../models/label");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const label = await Label.find({ project: id }).sort({ createdAt: -1 });
    res.status(200).json(label);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the label in this project",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await Label.create(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: "Unable to create label",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    await Label.findByIdAndRemove(id);
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "Unable to Delete",
    });
  }
});

module.exports = router;
