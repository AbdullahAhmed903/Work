import joi from "joi";

export const signup = {
  body: joi
    .object()
    .required()
    .keys({
      userName: joi.string().min(2).max(20).required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        )
        .required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    }),
};

export const confirmemail = {
  params: joi.object().required().keys({
    token: joi.string().required(),
  }),
};

export const login = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        )
        .required(),
    }),
};

export const forgetpassword = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    }),
};

export const resetpassword = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      newpassword: joi
        .string()
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        )
        .required(),
      repetpassword: joi.string().valid(joi.ref("newpassword")).required(),
      code: joi.string().required(),
    }),
};
