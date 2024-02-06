import { asyncHandler } from "../../../services/asyncHandler.js";
import userModel from "../../../BD/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../../services/Email.js";
import { nanoid } from "nanoid";

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  const searchuser = await userModel.findOne({ email });
  if (searchuser) {
    next(new Error("email exist", { cause: 409 }));
  } else {
    const hashpassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALTROUND)
    );
    const newuser = await userModel({
      userName,
      email,
      password: hashpassword,
    });
    const token = jwt.sign({ _id: newuser._id }, process.env.EMAILTOKEN, {
      expiresIn: "20h",
    });
    const reftoken = jwt.sign({ _id: newuser._id }, process.env.EMAILTOKEN);
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/user/confirmEmail/${token}`;
    const reflink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/user/confirmEmail/${reftoken}`;
    const message = `<a href='${link}'>follow me to confirm u account</a><br></br>
      <a href='${reflink}'>send confirm email</a>`;
    const info = sendEmail(email, "Confirmation Email", message);
    if (info) {
      const saveduser = await newuser.save();
      res.status(200).json({ message: "done", saveduserId: saveduser._id });
    } else {
      next(new Error("rejected email", { cause: 400 }));
    }
  }
});

export const confirmemail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);
  if (!decoded?._id) {
    next(new Error("in_valid payload", { cause: 400 }));
  } else {
    const user = await userModel.findOneAndUpdate(
      { _id: decoded._id, confirmEmail: false },
      { confirmEmail: true }
    );
    if (!user) {
      res
        .status(400)
        .json({ message: "email already confirmed or in-valid token" });
    } else {
      // res.status(200).redirect(process.env.FEURL);
      res.status(200).json({ message: "redirect to fontend url" });
    }
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    next(new Error("email not exist", { cause: 404 }));
  } else {
    if (!user.confirmEmail) {
      next(new Error("email not confirmed", { cause: 404 }));
    } else {
      if (user.isDeleted) {
        return next(new Error("email is deleted", { cause: 404 }));
      }
      if (user.blocked) {
        next(new Error("email blocked", { cause: 404 }));
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
          next(new Error("in-valid email or password", { cause: 404 }));
        } else {
          const token = jwt.sign(
            { _id: user._id, isLoggedIn: true },
            process.env.TOKENSIGNIN,
            { expiresIn: "24h" }
          );
          res.status(200).json({ message: "done", token });
        }
      }
    }
  }
});

export const forgetpassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email }).select("email");
  if (!user) {
    next(Error("in-valid user", { cause: 404 }));
  } else {
    const code = nanoid();
    sendEmail(email, "forgetpassword", `<h1>${code}</h1>`);
    const updateuser = await userModel.updateOne({ email: email }, { code });
    updateuser.modifiedCount
      ? res.status(200).json({ message: "done" })
      : next(Error("fail", { cause: 404 }));
  }
});

export const resetpassword = asyncHandler(async (req, res, next) => {
  const { email, code, newpassword } = req.body;
  if (code == null) {
    res.status(404).json({ message: "invalid code" });
  } else {
    const hashpassword = bcrypt.hashSync(
      newpassword,
      parseInt(process.env.SALTROUND)
    );
    const user = await userModel.updateOne(
      { email, code },
      { password: hashpassword, code: null }
    );
    user.modifiedCount
      ? res.status(200).json({ message: "done" })
      : next(Error("in-valid code", { cause: 404 }));
  }
});


const Signout=asyncHandler(async(req,res,next)=>{
  const {email}=req.body;
  
})
