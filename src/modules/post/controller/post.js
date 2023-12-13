import postModel from "../../../BD/model/post.model.js";
import userModel from "../../../BD/model/user.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const post = await postModel.create({
    title,
    content,
    createdBy: req.user._id,
  });
  res.status(201).json({ message: "done" });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const search = await postModel.findById({ _id: id });
  if (!search) {
    return next(new Error("in-valid postId", { cause: 404 }));
  } else {
    const deletepost = await postModel.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });
    if (!deletepost) {
      return next(new Error("unauthorization to delete post "));
    } else {
      res.status(200).json({ message: "done" });
    }
  }
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const search = await postModel.findById({ _id: id });
  if (!search) {
    return next(new Error("in-valid postId", { cause: 404 }));
  } else {
    const checkRole = await userModel
      .findById({ _id: req.user._id })
      .select("Role");
    if (checkRole.Role == "user") {
      req.body.updatedBy = req.user._id;
      const post = await postModel.findOneAndUpdate(
        { _id: id, createdBy: req.user._id },
        req.body,
        { new: true }
      );
      if (!post) {
        return next(new Error("unauthorization to update post"));
      } else {
        res.status(200).json({ message: "done", post });
      }
    } else {
      req.body.updatedBy = req.user._id;
      const post = await postModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!post) {
        return next(new Error("unauthorization to update post"));
      } else {
        res.status(200).json({ message: "done", post });
      }
    }
  }
});

export const likePost = asyncHandler(async (req, res, next) => {
  const { PostId } = req.params;
  const post = await postModel.findOneAndUpdate(
    {
      _id: PostId,
      likes: { $nin: req.user._id },
    },
    { $addToSet: { likes: req.user._id }, $pull: { unlikes: req.user._id } },
    { new: true }
  );
  if (!post) {
    return next(new Error("in-valid postId or you already like post"));
  } else {
    res.status(200).json({ message: "done" });
  }
});

export const unlikePost = asyncHandler(async (req, res, next) => {
  const { PostId } = req.params;
  const post = await postModel.findOneAndUpdate(
    {
      _id: PostId,
      unlikes: { $nin: req.user._id },
    },
    { $addToSet: { unlikes: req.user._id }, $pull: { likes: req.user._id } },
    { new: true }
  );
  if (!post) {
    return next(new Error("in-valid postId or you already like post"));
  } else {
    res.status(200).json({ message: "done" });
  }
});
