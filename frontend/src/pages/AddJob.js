import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@material-ui/core/Card";
import { makeStyles, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import { AddNewJob } from "../actions/jobs";
import CSRFToken from "../components/CSRFToken";

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

const AddJob = ({ is_employer, user, AddNewJob, categories }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    job_type: "Full time",
    description: "",
    vacancy: "",
    salary: "",
    experience: "",
    category: 1,
  });

  let { title, job_type, description, vacancy, salary, experience, category } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AddNewJob(
      title,
      job_type,
      description,
      Number(vacancy),
      Number(salary),
      Number(experience),
      category
    );
    navigate("/", { replace: true });
  };

  if (!is_employer) return navigate("/", { replace: true });

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
          <CSRFToken />
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
            <Select
              name="job_type"
              value={job_type}
              onChange={(e) => onChange(e)}
              inputProps={{
                id: "uncontrolled-native",
              }}
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
            </Select>
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
            <Select
              name="category"
              value={category}
              onChange={(e) => onChange(e)}
              inputProps={{
                id: "uncontrolled-native",
              }}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
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
  return {
    is_employer: state.profile.is_employer,
    categories: state.categories.categories,
    user: state.profile,
  };
};

export default connect(mapStateToProps, { AddNewJob })(AddJob);
