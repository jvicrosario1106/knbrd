const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const protectedRoutes = require("../middleware/protectroutes");
const Project = require("../models/project");
const Column = require("../models/column");
const Tasks = require("../models/task");
const Label = require("../models/label");
const Task = require("../models/task");

router.get("/", protectedRoutes, async (req, res) => {
  const user = req.user._id;

  try {
    const projects = await Project.aggregate([
      {
        $match: { user: { $in: [user] } },
      },
      {
        $lookup: {
          from: "columns",
          as: "columns",
          localField: "columns",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "users",
          as: "user",
          localField: "user",
          foreignField: "_id",
        },
      },
      {
        $project: { user: { password: 0 } },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the Projects",
    });
  }
});

router.get("/:id", protectedRoutes, async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;

  try {
    const getProject = await Project.findById(id);

    const projects = await Project.aggregate([
      {
        $match: { _id: getProject._id },
      },

      {
        $lookup: {
          from: "columns",
          localField: "columns",
          foreignField: "_id",
          let: { columns: "$columns" },

          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$columns"] } } },
            {
              $addFields: {
                sort: {
                  $indexOfArray: ["$$columns", "$_id"],
                },
              },
            },
            { $sort: { sort: 1 } },

            {
              $lookup: {
                from: "tasks",
                localField: "task",
                foreignField: "_id",
                let: { task: "$task" },
                as: "task",
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$task"] } } },
                  {
                    $addFields: {
                      sort: {
                        $indexOfArray: ["$$task", "$_id"],
                      },
                    },
                  },
                  { $sort: { sort: 1 } },
                  {
                    $lookup: {
                      from: "labels",
                      localField: "label",
                      foreignField: "_id",
                      as: "label",
                    },
                  },
                ],
              },
            },
          ],

          as: "columns",
        },
      },

      {
        $lookup: {
          from: "users",
          as: "user",
          localField: "user",
          foreignField: "_id",
        },
      },

      {
        $project: { user: { password: 0 } },
      },
    ]);

    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the Projects",
    });
  }
});

router.post("/", protectedRoutes, async (req, res) => {
  const user = req.user._id;
  const { name } = req.body;

  try {
    const project = await Project.create({ user: user, name });
    if (project) {
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to create projects",
    });
  }
});

router.delete("/:id", protectedRoutes, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID ",
    });
  }

  try {
    const [project, column, label, task] = await Promise.all([
      Project.findByIdAndRemove(id),
      Column.deleteMany({ project: id }),
      Label.deleteMany({ project: id }),
      Task.deleteMany({ project: id }),
    ]);
    if (project) {
      res.status(200).json({
        message: "Successfully Deleted",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to Delete Project",
    });
  }
});

router.patch("/changename", protectedRoutes, async (req, res) => {
  const { _id, name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "Invalid ID ",
    });
  }
  try {
    const response = await Project.updateOne({ _id }, { name });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: "Unable to Update Data",
    });
  }
});

module.exports = router;
