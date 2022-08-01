import { UnAuthenticatedError } from "../errors/index.js";

// Check if the user from req.user.userId(string) matches with job.createdBy (object). We pass entire user object so that we can check if there is "admin" role.
const checkPermissions = (requestUser, resourceUserId) => {
  //   if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route!");
};

export default checkPermissions;
