const dataMethod = ["body", "params", "query", "headers"];

export const validation = (schema) => {
  return (req, res, next) => {
    try {
      const validationArr = [];
      dataMethod.forEach((key) => {
        if (schema[key]) {
          const validationResult = schema[key].validate(req[key], {
            abortEarly: false,
          });
          if (validationResult?.error) {
            validationArr.push(validationResult);
          }
        }
      });
      if (validationArr.length) {
        res.status(400).json({ message: "validation Error", validationArr });
      } else {
        next();
      }
    } catch (error) {
      next("validation error", { cause: 400 });
    }
  };
};
