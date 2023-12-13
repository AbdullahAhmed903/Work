import jwt from "jsonwebtoken";
import { asyncHandler } from "../services/asyncHandler.js";
import userModel from "../BD/model/user.model.js";
export const roles = {
  user: "user",
  admin: "admin",
  superadmin: "superAdmin",
};

export const auth = (accessroles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
      next(new Error("authorization is not defined", { cause: 400 }));
    } else {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.BearerKey)) {
        next("in-valid token OR BearerKey", { cause: 400 });
      } else {
        const token = authorization.split("abdo__")[1];
        const decoded = jwt.verify(token, process.env.TOKENSIGNIN);
        if (!decoded?._id || !decoded?.isLoggedIn) {
          next(new Error("In-valid token payload", { cause: 400 }));
        } else {
          const user = await userModel
            .findById({ _id: decoded._id })
            .select("userName email Role");
          if (!user) {
            next(new Error("Not register user", { cause: 404 }));
          } else {
            if (!accessroles.includes(user.Role)) {
              next(new Error("You Not Auth User", { cause: 403 }));
            } else {
              req.user = user;
              next();
            }
          }
        }
      }
    }
  });
};
