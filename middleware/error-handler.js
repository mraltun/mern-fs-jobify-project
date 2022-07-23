// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";

// Catch errors and show them as internal errors. We need err argument for the error, next for the moving to next middleware.
const errorHandlerMiddleware = (err, req, res, next) => {
  // Setup a default error object
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, try again later",
  };

  // Missing fields error. Get the name of the error from err object, update status code and the message.
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    // Combine multiple error messages inside an object, then loop through them to join all in a single string.
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
