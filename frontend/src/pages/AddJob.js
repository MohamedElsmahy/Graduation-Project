import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Card from "@material-ui/core/Card";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { AddNewJob } from "../actions/jobs";

const useStyle = makeStyles({
  card: {
    boxShadow: 10,
  },
  field: {
    marginTop: 30,
    marginBottom: 30,
    display: "block",
  },
});

const AddJob = ({ is_employer, user, AddNewJob }) => {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    owner: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    title: "",
    job_type: "Full time",
    description: "",
    vacancy: "",
    salary: "",
    experience: "",
    category: 1,
  });

  let {
    owner,
    username,
    first_name,
    last_name,
    title,
    job_type,
    description,
    vacancy,
    salary,
    experience,
    category,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await AddNewJob(
      owner,
      username,
      first_name,
      last_name,
      title,
      job_type,
      description,
      Number(vacancy),
      Number(salary),
      Number(experience),
      category
    );
    if (res.status === 201) return <Navigate replace to="/" />;
  };

  if (!is_employer) return <Navigate replace to="/" />;

  return (
    <div>
      <Card
        style={{
          width: 900,
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 100,
          marginBottom: 30,
        }}
        className={classes.card}
      >
        <h1 style={{ marginLeft: 30, textAlign: "center" }}>Add Job</h1>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          noValidate
          autoComplete="off"
          style={{ width: 850, marginRight: "auto", marginLeft: "auto" }}
        >
          <TextField
            className={classes.field}
            label="title"
            name="title"
            value={title}
            onChange={(e) => {
              onChange(e);
            }}
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <FormControl className={classes.field}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {" "}
              job_type
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              name="job_type"
              // value={job_type}
              // onChange={(e) => {
              //   onChange(e);
              // }}
              inputProps={{
                name: "job_type",
                id: "uncontrolled-native",
              }}
            >
              <option value={null}>__ _ _ _</option>
              <option>Full time</option>
              <option>Part time</option>
            </NativeSelect>
          </FormControl>

          <TextField
            className={classes.field}
            label="description"
            name="description"
            value={description}
            onChange={(e) => {
              onChange(e);
            }}
            variant="outlined"
            color="primary"
            multiline
            rows={8}
            fullWidth
            required
          />
          <TextField
            type="number"
            label="vacancy"
            name="vacancy"
            value={vacancy}
            onChange={(e) => {
              onChange(e);
            }}
            variant="outlined"
            fullWidth
          />
          <br />
          <br />

          <TextField
            type="number"
            label="salary"
            name="salary"
            value={salary}
            onChange={(e) => {
              onChange(e);
            }}
            variant="outlined"
            fullWidth
          />
          <br />
          <br />

          <TextField
            type="number"
            label="experience"
            name="experience"
            value={experience}
            onChange={(e) => {
              onChange(e);
            }}
            variant="outlined"
            fullWidth
          />
          <br />
          <br />
          <FormControl className={classes.field}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {" "}
              category
            </InputLabel>
            <NativeSelect
              name="category"
              // value={category}
              // onChange={(e) => {
              //   onChange(e);
              // }}
              defaultValue={30}
              inputProps={{
                name: "category",
                id: "uncontrolled-native",
              }}
            >
              <option value={null}>__ _ _ _</option>
              <option>web developmen</option>
              <option>mobile application</option>
              <option>other</option>
            </NativeSelect>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            color="primary"
            style={{
              color: "primary",
              padding: 15,
              fontWeight: "bold",
              fontSize: 15,
            }}
            fullWidth
          >
            Add Job
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { is_employer: state.profile.is_employer, user: state.profile };
};

export default connect(mapStateToProps, { AddNewJob })(AddJob);
