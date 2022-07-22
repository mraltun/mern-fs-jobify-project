// Import Express Router
import express from "express";
const router = express.Router();
// Import Jobs controller
import {
  createJob,
  deleteJob,
  getAllJobs,
  showStats,
  updateJob,
} from "../controllers/jobsController.js";

// Setting the routes here, we will import them in server.js
router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
