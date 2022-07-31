import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return <Wrapper>No jobs to display..</Wrapper>;
  }

  return (
    <Wrapper>
      <h5>
        {/* If there is more than one job, make it "jobs" */}
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* pagination buttons */}
    </Wrapper>
  );
};

export default JobsContainer;
