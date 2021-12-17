import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadJobs } from '../actions/jobs';
import { connect } from 'react-redux';

const JobsList = ({ loadJobs , jobs }) => {
  //let [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  // let getJobs = async () => {
  //   let response = await fetch("localhost:8000/jobs/api/jobs");
  //   if (response.status === 200) {
  //     let data = await response.json();
  //     setJobs(data.data);
  //   } else {
  //     setJobs(null);
  //   }
  // };

  return (
    <div>
      <ul>
        {jobs ? (
          jobs.map((job) => {
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
          })
        ) : (
          <li>
            <h3>No jobs yet</h3>
          </li>
        )}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { jobs: state.jobs.jobs };
};

export default connect(mapStateToProps, { loadJobs })(JobsList);
