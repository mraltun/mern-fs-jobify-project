///////////////////////////////////////////
/// Add "mock-data.json" to DB
///////////////////////////////////////////

// Import the one that returns promise, not the default callback one
import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/Job.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // Delete every jobs so we can have fresh DB
    await Job.deleteMany();

    // We are using ES6 modules
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    // Pass the entire array and create jobs on the DB
    await Job.create(jsonProducts);

    console.log("Success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
