import { Schema, model } from "mongoose";

const userschema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: null,
    },
    Role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superAdmin"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userschema);

export default userModel;
