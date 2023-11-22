import mongoose from "mongoose";

export async function connectMongo(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongo Connected");
    })
    .catch((err) => console.log("Mongo Error", err));
}
