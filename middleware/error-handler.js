// Catch errors and show them as internal errors. We need err argument for the error, next for the moving to next middleware.
const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ msg: "There was an error" });
};

export default errorHandlerMiddleware;
