import mongoose from "mongoose";

export const connectionDB = async () => {
  return await mongoose
    .connect(process.env.DBURI)
    .then((result) => {
      console.log("successful to connection to DB");
    })
    .catch((error) => {
      console.log("fail to connection to DB");
    });
};
