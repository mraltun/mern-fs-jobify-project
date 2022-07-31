import React from "react";
import moment from "moment";

const Job = ({ company, createdAt }) => {
  // Format the date from Mongo to readable date like "Jul 30th, 2022"
  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div>
      <h5>{company}</h5>
      <h5>{date}</h5>
    </div>
  );
};

export default Job;
