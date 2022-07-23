// Import User model
import User from "../models/User.js";

// Because of Express Async Errors, we don't need to use try/catch block and next(error) to pass error to errorHandlerMiddleware. We don't check things in the controller so no need to throw errors
const register = async (req, res) => {
  // Create user object from User model with the data from req.body object. Return the user object in json.
  const user = await User.create(req.body);
  res.status(201).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("updateUser user");
};

export { register, login, updateUser };
