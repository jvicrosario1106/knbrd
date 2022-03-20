const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Column = require("../models/column");

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    if (task) {
      const column = await Column.updateOne(
        { _id: req.body.column },
        { $push: { task: { $each: [task._id], $position: 0 } } }
      );
      if (column) {
        res.status(200).json(task);
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "Successfully Created new task",
    });
  }
});

module.exports = router;
