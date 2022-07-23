// Our custom class for Error so that we can send status codes and error messages to error-handler
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
