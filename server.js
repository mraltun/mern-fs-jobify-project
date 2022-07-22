// Using ES6 imports & exports instead require from CommonJS. Add ("type": "module") to package.json or change file extensions to ".mjs"
import express from "express";
// Dotenv for the loading environment variables from a.env file into "process.env"
import dotenv from "dotenv";
dotenv.config();
// MongoDB connection
import connectDB from "./db/connect.js";
// Middlewares. Adding file extension ".js" at the end is required for ES6 imports
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Show error for the routes that doesn't match with defined routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

// Needs to be async because "mongoose.connect" returns promise
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
