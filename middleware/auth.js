import { UnAuthenticatedError } from "../errors/index.js";

// Authenticate user then next it to controller
const auth = async (req, res, next) => {
  const authHeader = req.headers.authentication;

  if (!authHeader) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  next();
};

export default auth;
