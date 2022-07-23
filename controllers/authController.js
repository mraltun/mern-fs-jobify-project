// Import User model
import User from "../models/User.js";
// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

// Because of Express Async Errors (EAE), we don't need to use try/catch block and next(error) to pass error to errorHandlerMiddleware. Also, We don't check things in the controller so no need to throw errors (except in the if below)
const register = async (req, res) => {
  // Check for the empty field errors before error handler middleware
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // Here, we throw error instead passing it to middleware with next() because we installed EAE.
    throw new BadRequestError("Please provide all values");
  }

  // Check for email is not unique errors before error handler middleware
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  // Create user object from User model with the data from req.body object and create token from custom method. Return the user object and jwt token.
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    // We removed password from output with select in schema but it doesn't work with create method above. We pass everything else here.
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("updateUser user");
};

export { register, login, updateUser };
