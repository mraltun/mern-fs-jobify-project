// Authenticate user then next it to controller
const auth = async (req, res, next) => {
  console.log("authenticate user");
  next();
};

export default auth;
