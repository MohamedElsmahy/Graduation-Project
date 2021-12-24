import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadJob, DeleteJob, UserApplyJob } from "../actions/jobs";
import { connect } from "react-redux";
import { SendNotifications } from "../actions/notifications";

import Button from "@material-ui/core/Button";

const JobDetails = ({
  SendNotifications,
  isAuthenticated,
  loadJob,
  DeleteJob,
  UserApplyJob,
  job,
  userId,
}) => {
  const [jobDeleted, setJobDeleted] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    loadJob(id);
  }, []);

  if (jobDeleted) navigate("/", { replace: true });

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

  const handleApplyJob = (e) => {
    e.preventDefault();
    SendNotifications(job.owner,true,job.id,userId).then(res=>{
      window.alert(res)
     });
    console.log(isAuthenticated);
    {
      isAuthenticated ? UserApplyJob(id) : navigate(`/job/${id}/apply`);
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
            <form onSubmit={(e) => handleApplyJob(e)}>
              <Button type="submit">
                <h4>Apply</h4>
              </Button>
            </form>
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
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { loadJob, DeleteJob, UserApplyJob,SendNotifications })(
  JobDetails
);
