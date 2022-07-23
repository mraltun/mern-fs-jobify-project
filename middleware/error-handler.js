// Catch errors and show them as internal errors. We need err argument for the error, next for the moving to next middleware.
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: err });
};

export default errorHandlerMiddleware;
