import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongo_DB:mongoDB14@cluster0.s8hxf.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Mongoose is connected successfully");
    server = app.listen(PORT, () => {
      console.log(`App is listening on post: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
