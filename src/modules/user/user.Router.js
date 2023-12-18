import { Router } from "express";
const userRouter = Router();
import * as user from "./controller/user.js";
import * as validators from "./user.validation.js";
import { validation } from "../../middleware/validation.middle.js";
userRouter.post("/signup", validation(validators.signup), user.signup);

userRouter.get(
  "/confirmEmail/:token",
  validation(validators.confirmemail),
  user.confirmemail
);
userRouter.post("/login", validation(validators.login), user.login);
userRouter.patch(
  "/forgetpassword",
  validation(validators.forgetpassword),
  user.forgetpassword
);
userRouter.patch(
  
  "/resetpassword",
  validation(validators.resetpassword),
  user.resetpassword
);

export default userRouter;
