import { Router } from "express";
import * as Comment from "./controller/comment.js";
import { auth } from "../../middleware/Authorization.middle.js";
import commentendpoint from "./comment.endpoint.js";
const commentRouter = Router({mergeParams:true});
commentRouter.post("/createComment",auth(commentendpoint.create),Comment.createComment)
export default commentRouter;
