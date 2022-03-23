const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Column = require("../models/column");
const Project = require("../models/project");
const Task = require("../models/task");

router.post("/", async (req, res) => {
  const { project, name } = req.body;

  try {
    const createColumn = await Column.create(req.body);

    if (createColumn) {
      const updateProject = await Project.updateOne(
        { _id: project },
        { $push: { columns: { $each: [createColumn._id], $position: 0 } } }
      );
      if (updateProject) {
        res.status(200).json(createColumn);
      } else {
        res.status(400).json({
          message: "Unable to update",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to update",
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
    const getColumn = await Column.findById(id);
    const [deleteColumn, deleteTask, deleteColumnInProject] = await Promise.all(
      [
        Column.findByIdAndRemove(id),
        Task.deleteMany({ project: getColumn.project }),

        Project.updateOne(
          { _id: getColumn.project },
          { $pull: { columns: getColumn._id } }
        ),
      ]
    );

    if (deleteColumnInProject) {
      res.status(200).json({
        message: "Successfully Deleted",
      });
    } else {
      res.status(400).json({
        message: "Unable to deleted column",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to delete Column",
    });
  }
});

router.patch("/columnOrder", async (req, res) => {
  const { project, columns } = req.body;

  try {
    const response = await Project.updateOne(
      { _id: project },
      { $set: { columns: columns } }
    );
    if (response) {
      res.status(200).json({
        message: "Successfully Updated",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to Update",
    });
  }
});

module.exports = router;
