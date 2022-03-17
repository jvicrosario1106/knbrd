const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
