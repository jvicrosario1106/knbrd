const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Column = require("../models/column");

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    
    if (task) {
      const [column,newTask] = await Promise.all([Column.updateOne(
        { _id: req.body.column },
        { $push: { task: { $each: [task._id], $position: 0 } } }
      ), Task.aggregate([{
        $match:{_id:task._id}
      },
    {
      $lookup:{
        from:"users",
        as:"assignees",
        localField:"assignees",
        foreignField:"_id"
      }
    },
    {
      $lookup:{
        from:"labels",
        as:"label",
        localField:"label",
        foreignField:"_id"
      }
    }
  ]
      )]);

      if (column) {
        res.status(200).json(newTask);
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to create new task",
    });
  }
});

router.patch("/taskOrder", async (req, res) => {
  const { column, task } = req.body;

  try {
    const response = await Column.updateOne(
      { _id: column },
      { $set: { task } }
    );
    if (response) {
      res.status(200).json({
        message: "Successuflly Ordered",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to update",
    });
  }
});

module.exports = router;
