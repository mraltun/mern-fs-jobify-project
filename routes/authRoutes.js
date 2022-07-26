// Import Express Router
import express from "express";
const router = express.Router();
// Auth controllers
import { register, login, updateUser } from "../controllers/authController.js";
// Auth middleware
import authenticateUser from "../middleware/auth.js";

// Setting the routes here, we will import them in server.js
// router.post("/register", register);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
