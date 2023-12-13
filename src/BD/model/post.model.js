import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
    unlikes: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const postModel = model("Post", postSchema);

export default postModel;
