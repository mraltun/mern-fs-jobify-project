// Import Job model
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

// Create job
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  // Get the user's id so we know which user created the job posting
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  // Find all the jobs created by specific user
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    // The jobs, how many of jobs and the page number
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};

const showStats = async (req, res) => {
  res.send("showStats");
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
