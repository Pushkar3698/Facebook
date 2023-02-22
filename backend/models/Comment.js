const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
