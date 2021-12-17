import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Paper, TextField } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import FavoriteIcon from '@material-ui/icons/Favorite';
// import color from 'material-ui/colors/amber';

const JobsList = () => {
  const formstyle = {
    width: '270px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const texfielsstyle = {
    padding: '10px',
    marginBottom: '5px',
    width: '250px',
  };
  const header = {
    marginLeft: '10px',
  };

  const paperstyle = {
    padding: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const cardheader = {
    marginTop: '10px',
    marginBottom: '0px',
    marginLeft: '30px',
  };
  const button = {
    background: '#4caf50',
    color: 'red',
    fontSize: '15px',
    padding: '8px',
    marginLeft: '10px',
    fontWeight: 'bold',
    width: '150px',
  };
  const icon = {
    marginLeft: '70px',
    color: '#4caf50',
    background: 'lightgray',
  };
  const listjob = {
    padding: '1px',
  };

  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  // let getJobs = async () => {
  //   let response = await fetch('http://127.0.0.1:8000/jobs/api/jobs');
  //   let data = await response.json();
  //   setJobs(data.data);
  // };

  return (
    <div>
      <Card
        style={{
          width: 1250,
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: 90,
          marginBottom: 30,
        }}
      >
        <Grid container style={{ gap: 50 }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={5} style={paperstyle}>
              <h2
                style={{
                  padding: 10,
                  fontWeight: 'bold',
                  fontSize: 30,
                  marginBottom: 1,
                }}
              >
                filter
              </h2>
              <form style={formstyle}>
                <TextField
                  style={texfielsstyle}
                  fullWidth
                  label="title contains"
                />
                <FormControl fullWidth style={texfielsstyle}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {' '}
                    job_type
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'job_type',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={null}>__ _ _ _</option>
                    <option>Full time</option>
                    <option>Part time</option>
                  </NativeSelect>
                </FormControl>
                <TextField
                  fullWidth
                  label="description contains"
                  style={texfielsstyle}
                />
                <TextField
                  style={texfielsstyle}
                  type="number"
                  label="experience"
                  variant="outlined"
                  fullWidth
                />
                <FormControl fullWidth style={texfielsstyle}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {' '}
                    category
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'category',
                      id: 'uncontrolled-native',
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
                  style={{
                    background: '#4caf50',
                    color: 'white',
                    padding: 15,
                    fontWeight: 'bold',
                    fontSize: 15,
                    margin: 5,
                    width: 260,
                  }}
                >
                  Search
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={5} style={listjob}>
              <h2 style={header}>Job list</h2>
            </Paper>
            <Card style={{ marginTop: 15 }} fullWidth>
              <Grid container fullWidth>
                <Grid container item xs={12} spacing={3}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    title="web developer"
                    subheader="calfornia"
                  />
                  <Grid item xs={12} md={3} spacing={3}>
                    <CardHeader style={cardheader} subheader="full time" />
                  </Grid>
                  <Grid item xs={12} md={6} spacing={12}>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        color="secondary"
                        style={icon}
                      >
                        <FavoriteIcon />
                      </IconButton>

                      <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        style={button}
                      >
                        Apply Now
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Card style={{ marginTop: 15 }} fullWidth>
              <Grid container fullWidth>
                <Grid container item xs={12} spacing={3}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    title="web developer"
                    subheader="calfornia"
                  />
                  <Grid item xs={12} md={3} spacing={3}>
                    <CardHeader style={cardheader} subheader="full time" />
                  </Grid>
                  <Grid item xs={12} md={6} spacing={12}>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        color="secondary"
                        style={icon}
                      >
                        <FavoriteIcon />
                      </IconButton>

                      <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        style={button}
                      >
                        Apply Now
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Card>
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
