// Using ES6 imports & exports instead require from CommonJS. Add ("type": "module") to package.json or change file extensions to ".mjs"
import express from "express";
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
