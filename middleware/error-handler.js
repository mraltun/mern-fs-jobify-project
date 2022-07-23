// Import HTTP Status Codes
import { StatusCodes } from "http-status-codes";

// Catch errors and show them as internal errors. We need err argument for the error, next for the moving to next middleware.
const errorHandlerMiddleware = (err, req, res, next) => {
  // When there is no err.message or err.statusCode from throwing error, show default values
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
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

  // Unique field error. The field has to be unique (email for now)
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Get the field name from key (email) of the keyValue property
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
