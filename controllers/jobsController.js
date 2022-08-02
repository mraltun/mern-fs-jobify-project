// Import Job model
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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
  // Query string parameters
  const { search, status, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  // If it's interview, declined or pending match the status
  if (status !== "all") {
    queryObject.status = status;
  }

  // Find all the jobs created by specific user
  let result = Job.find(queryObject);

  const jobs = await result;
  res
    .status(StatusCodes.OK)
    // The jobs, how many of jobs and the page number
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  // Get the id from url ("/:id" route) and give "jobId" alias
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please Provide All Values");
  }

  // Get the id whose match with jobId
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // Permissions.  We pass entire user object so that we can check if there is "admin" role
  checkPermissions(req.user, job.createdBy);

  // Update the job with all the info inside body, then return the updated job. findOneAndUpdate won't trigger hooks
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  // Alternative way, this will trigger the save hooks. You need to destruct more properties from the body above
  // job.position = position;
  // await job.save();

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed!" });
};

const showStats = async (req, res) => {
  // Aggregation pipeline is series of steps. Stats in here is an array with objects for each status and it's count
  let stats = await Job.aggregate([
    // Get the every jobs that created by specific user. userId is string so we use ObjectId
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // Group the jobs by status value (pending, interview etc..) and how many of them in there.
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Make stats an object with status and count
  stats = stats.reduce((acc, curr) => {
    // Get the id as title and count
    const { _id: title, count } = curr;
    // Dynamic Key
    acc[title] = count;
    return acc;
  }, {});

  // If the user doesn't have any stats, at least show them stats with 0 values instead nothing
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      // Group the jobs per year and per month. Also count how many jobs "created" at which month and which year
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    // Sort them with latest job first
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    // Last 6 months
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // moment counts months 0-11 while MongoDB 1-12
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    // Show the oldest month instead latest one
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
