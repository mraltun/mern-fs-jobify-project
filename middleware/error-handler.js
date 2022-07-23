// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";

// Catch errors and show them as internal errors. We need err argument for the error, next for the moving to next middleware.
const errorHandlerMiddleware = (err, req, res, next) => {
  // Setup a default error object
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, try again later",
  };

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
