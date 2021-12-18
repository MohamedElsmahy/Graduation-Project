import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { loadJob, DeleteJob } from "../actions/jobs";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

const JobDetails = ({ loadJob, DeleteJob, job, userId }) => {
  const [jobDeleted, setJobDeleted] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadJob(id);
  }, []);

  if (jobDeleted) return <Navigate replace to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    const delete_Job = async () => {
      await DeleteJob();
      if (DeleteJob() === 204) {
        setJobDeleted(true);
      }
    };
    delete_Job();
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
        {userId === job.user && (
          <form onSubmit={(e) => onSubmit(e)}>
            <Button type="submit">
              <h4>Delete Job</h4>
            </Button>
          </form>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    job: state.job.job,
    userId: state.profile.id,
  };
};

export default connect(mapStateToProps, { loadJob, DeleteJob })(JobDetails);
