import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Paper, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



import { loadJobs } from '../actions/jobs';
import { connect } from 'react-redux';

const JobsList = ({ loadJobs, jobs }) => {
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
    color: '#3f51b5',
    textAlign:"center"
  };
  const paperstyle = {
    padding: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const cardheader = {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '30px',
  };
  const button = {
    color: '#3f51b5',
    fontSize: '15px',
    padding: '8px',
    marginLeft: '80px',
    marginTop:'10px',
    fontWeight: 'bold',
    width: '160px',
  };
  const icon = {
    marginTop:'8px',
    marginLeft: '120px',
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <Grid
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
            <Paper elevation={4} style={paperstyle}>
              <h1 style={header}> Filter </h1>
              <form style={formstyle}>
                <TextField
                  variant="outlined"
                  style={texfielsstyle}
                  fullWidth
                  label="Title contains"
                />
                <FormControl fullWidth variant="outlined" style={texfielsstyle}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Job Type
                  </InputLabel>
                  <Select
                    defaultValue={30}
                    inputProps={{
                      name: 'job_type',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <MenuItem>Full time</MenuItem>
                    <MenuItem>Part time</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Description contains"
                  style={texfielsstyle}
                />
                <TextField
                  style={texfielsstyle}
                  type="number"
                  label="Experience"
                  variant="outlined"
                  fullWidth
                />
                <FormControl fullWidth variant="outlined" style={texfielsstyle}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Category
                  </InputLabel>
                  <Select
                    defaultValue={30}
                    inputProps={{
                      name: 'category',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <MenuItem>web developmen</MenuItem>
                    <MenuItem>mobile application</MenuItem>
                    <MenuItem>other</MenuItem>
                  </Select>
                </FormControl>
            
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                  style={{
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
          <Paper elevation={4} style={paperstyle}>
            
              <h1 style={header}>Job list</h1>
            
            <Card style={{ backgroundColor:"whitesmoke", marginTop: 15, marginBottom: 25 }} fullWidth>
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
                      <FormControlLabel
                        style={icon}
                        control={ <Checkbox color="primary" icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>}
                      />
            
                      <Button href="/applyjob"
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
            </Paper>
          </Grid>
        </Grid>
      </Grid>
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
          <h3>No jobs yet</h3>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { jobs: state.jobs.jobs };
};

export default connect(mapStateToProps, { loadJobs })(JobsList);