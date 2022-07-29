import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

// Authenticate user then next it to controller
const auth = async (req, res, next) => {
  // Check the header
  const authHeader = req.headers.authorization;

  // If there is problem with the header show error
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  // Split the Bearer and the token, then take the token.
  const token = authHeader.split(" ")[1];

  try {
    // Verify token by token and the secret we have in the env file
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Add a user property with userId (_id) object
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
