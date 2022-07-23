// Import User model
import User from "../models/User.js";
// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";

// Our custom class for Error so that we can send status codes and error messages to error-handler
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// Because of Express Async Errors (EAE), we don't need to use try/catch block and next(error) to pass error to errorHandlerMiddleware. Also, We don't check things in the controller so no need to throw errors (except in the if below)
const register = async (req, res) => {
  // Check for the errors before error handler middleware
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // Here, we throw error instead passing it to middleware with next() because we installed EAE.
    throw new CustomAPIError("Please provide all values");
  }
  // Create user object from User model with the data from req.body object. Return the user object in json.
  const user = await User.create(name, email, password);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("updateUser user");
};

export { register, login, updateUser };
