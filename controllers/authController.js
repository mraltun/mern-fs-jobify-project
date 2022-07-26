// Import User model
import User from "../models/User.js";
// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

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
  const { email, password } = req.body;
  // Check if user and password are missing
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // Match the user with the same email from body. We made password field hidden in the User model. We need to override and manually add password field to show up
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // Check if the password is correct with document method
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // Create the token
  const token = user.createJWT();
  // We made password field selected but now remove it from the response
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  // Check if any of the fields are missing
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  // Find the user whose ID matches
  const user = await User.findOne({ _id: req.user.userId });

  // Update the property values
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  // Save the user
  await user.save();

  // Issue new token that's optional.
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
