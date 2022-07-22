// Using ES6 imports & exports instead require from CommonJS. Add ("type": "module") to package.json or change file extensions to ".mjs"
import express from "express";
// Dotenv for the loading environment variables from a.env file into "process.env"
import dotenv from "dotenv";
dotenv.config();
// MongoDB connection and authenticateUser
import connectDB from "./db/connect.js";
// Import routers
import authRouter from "./routes/authRoutes.js";
// Middlewares. Adding file extension ".js" at the end is required for ES6 imports
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
// Built-in middleware for JSON that we pass in post requests in the controllers
app.use(express.json());

const app = express();

// Dummy home route
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Routes from AuthRoutes
app.use("/api/v1/auth", authRouter);

// Show error for the routes that doesn't match with defined routes above
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Set the port
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
// Start the server
start();
