import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobsList = () => {
  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  let getJobs = async () => {
    let response = await fetch("http://127.0.0.1:8000/jobs/api/jobs");
    let data = await response.json();
    setJobs(data.data);
  };

  return (
    <div>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              <ul>
                <li>
                  <Link to={`/jobs/${job.id}`}>title: {job.title}</Link>
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
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JobsList;
