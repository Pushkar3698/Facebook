const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    creatorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
