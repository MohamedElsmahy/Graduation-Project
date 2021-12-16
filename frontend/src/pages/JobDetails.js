import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  let [job, setJob] = useState([]);

  const params = useParams();
  let { id } = params;

  useEffect(() => {
    getJob();
  }, []);

  let getJob = async () => {
    let response = await fetch(`http://127.0.0.1:8000/jobs/api/jobs/${id}`);
    if (response.status === 200) {
      let data = await response.json();
      setJob(data.data);
    } else {
      setJob(null);
    }
  };

  return (
    <div>
      <ul>
        {job ? (
          <>
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
          </>
        ) : (
          <li>
            <h3>job not found</h3>
          </li>
        )}
      </ul>
    </div>
  );
};

export default JobDetails;
