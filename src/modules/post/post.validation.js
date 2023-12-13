import joi from "joi";

export const createPost = {
  body: joi
    .object()
    .required()
    .keys({
      title: joi.string().min(1).max(60).required(),
      content: joi.string().min(1).required(),
    }),
};

export const updatepost = {
  body: joi
    .object()
    .required()
    .keys({
      title: joi.string().min(1).max(60),
      content: joi.string(),
    }),
};
