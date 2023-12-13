import { Router } from "express";

import * as posts from "./controller/post.js";
import { auth } from "../../middleware/Authorization.middle.js";
import postendpoint from "./post.endpoint.js";
import * as validators from "./post.validation.js";
import { validation } from "../../middleware/validation.middle.js";
import commentRouter from "../comment/comment.Router.js";
const postRouter = Router();
postRouter.use("/:postId/comment", commentRouter);
postRouter.post(
  "/createPost",
  auth(postendpoint.create),
  validation(validators.createPost),
  posts.createPost
);
postRouter.delete(
  "/deletePost/:id",
  auth(postendpoint.delete),
  posts.deletePost
);
postRouter.patch(
  "/updatePost/:id",
  auth(postendpoint.create),
  validation(validators.updatepost),
  posts.updatePost
);

postRouter.patch("/:PostId/like", auth(postendpoint.like), posts.likePost);
postRouter.patch(
  "/:PostId/unlike",
  auth(postendpoint.unlike),
  posts.unlikePost
);

export default postRouter;
