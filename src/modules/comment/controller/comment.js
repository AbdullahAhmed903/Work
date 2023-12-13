import commentModel from "../../../BD/model/comment.model.js";
import postModel from "../../../BD/model/post.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";

export const createComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const { postId } = req.params;
  const searchPost = await postModel.findById(postId);
  if (!searchPost) {
    return next(new Error("post not found", { cause: 404 }));
  } else {
    const comment = await commentModel.create({
      text,
      createdBy: req.user._id,
      postId,
    });
    if (comment) {
      res.status(201).json({ message: "done", comment });
    } else {
      return next(new Error("in-valid to add the comment", { cause: 400 }));
    }
  }
});
