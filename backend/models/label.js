const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
