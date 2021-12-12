import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  let [job, setJob] = useState([]);

  const params = useParams();
  let { id } = params;

  useEffect(() => {
    getJob();
  }, []);

  let getJob = async () => {
    let response = await fetch(`http://127.0.0.1:8000/jobs/api/jobs/${id}`);
    let data = await response.json();
    setJob(data.data);
  };

  return (
    <div>
      <Link to="/jobs">Browse Jobs</Link>
      <ul>
        <li>
          <h3>title: {job.title}</h3>
        </li>
        <li>
          <h4>job_type: {job.job_type}</h4>
        </li>
        <li>
          <p>description: {job.description}</p>
        </li>
        <li>salary: {job.salary}</li>
        <li>experince: {job.experince}</li>
        <li>vacancy: {job.vacancy}</li>
      </ul>
    </div>
  );
};

export default JobDetails;
