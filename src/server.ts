import "dotenv/config";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
let server: Server;
const connectUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s8hxf.mongodb.net/noteDB?retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
  try {
    await mongoose.connect(connectUri);
    console.log("Mongoose is connected successfully");
    server = app.listen(PORT, () => {
      console.log(`App is listening on post: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
