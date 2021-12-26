import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Paper, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { FilterJobs, SearchJobs } from "../actions/filters";

const FilteredJobsList = ({  filter, categories, FilterJobs, SearchJobs }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      // backgroundColor:"offwhite",
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const formstyle = {
    width: "250px",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const texfielsstyle = {
    padding: "10px",
    marginBottom: "5px",
    width: "250px",
  };
  const header = {
    color: "#3f51b5",
    textAlign: "center",
  };
  const paperstyle = {
    padding: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const cardheader = {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "30px",
  };
  const button = {
    color: "#3f51b5",
    fontSize: "15px",
    padding: "8px",
    marginLeft: "80px",
    marginTop: "10px",
    fontWeight: "bold",
    width: "160px",
  };
  const icon = {
    marginTop: "8px",
    marginLeft: "120px",
  };
  const classes = useStyles();

  const [formData, setFormData] = useState({
    job_type: "",
    experience: "",
    category: "",
  });

  const [searchData, setSearchData] = useState({
    title: "",
  });

  const [isUpdated, setIsUpdated] = useState(false);
//   const [isSearched, setIsSearched] = useState(true);

  const { job_type, experience, category } = formData;
  const { title } = searchData;

  useEffect(() => {
    FilterJobs();
  }, [isUpdated]);

  
  const onSubmit = (e) => {
    e.preventDefault();
    FilterJobs(job_type, experience, category);
    setIsUpdated = !isUpdated;
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    SearchJobs(title);
    // setIsSearched = !isSearched;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeSearch = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ gap: 50 }}
        >
          <Grid item xs={10} md={3}>
            <Paper elevation={4} style={paperstyle}>
              <h1 style={header}> Filter </h1>
              <form
                style={formstyle}
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                <FormControl fullWidth variant="outlined" style={texfielsstyle}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Job Type
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
                  style={texfielsstyle}
                  name="experience"
                  value={experience}
                  onChange={(e) => onChange(e)}
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
                  color="primary"
                  variant="contained"
                  disableElevation
                  style={{
                    padding: 15,
                    fontWeight: "bold",
                    fontSize: 15,
                    margin: 5,
                    width: 240,
                  }}
                >
                  Search
                </Button>
              </form>
              <form
                style={formstyle}
                onSubmit={(e) => {
                  onSubmitSearch(e);
                }}
              >
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    name="title"
                    value={title}
                    onChange={(e) => onChangeSearch(e)}
                    placeholder="Title Contains"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                  style={{
                    padding: 15,
                    fontWeight: "bold",
                    fontSize: 15,
                    margin: 5,
                    width: 240,
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
              {filter ? (
                filter.map((filterjob) => {
                  return (
                    <Card
                      key={filterjob.id}
                      style={{
                        backgroundColor: "whitesmoke",
                        marginTop: 15,
                        marginBottom: 25,
                      }}
                      fullWidth
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        fullWidth
                      >
                        <Link to={`/job/${filterjob.id}`}>
                          <CardHeader
                            avatar={<Avatar src={filterjob.image} />}
                            title={filterjob.title}
                            subheader={filterjob.category} // fix show category name
                          />
                        </Link>

                        <CardHeader
                          style={cardheader}
                          subheader={filterjob.job_type}
                        />

                        <CardActions disableSpacing>
                          <FormControlLabel
                            style={icon}
                            control={
                              <Checkbox
                                color="primary"
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                              />
                            }
                          />
                        </CardActions>
                      </Grid>
                    </Card>
                  );
                })
              ) : (
                <Card
                  style={{
                    backgroundColor: "whitesmoke",
                    marginTop: 15,
                    marginBottom: 25,
                  }}
                  fullWidth
                >
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
                            control={
                              <Checkbox
                                color="primary"
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                              />
                            }
                          />

                          <Button
                            href="/applyjob"
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
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { filter: state.filter.filter, categories: state.categories.categories };
};

export default connect(mapStateToProps, { FilterJobs, SearchJobs })(
    FilteredJobsList
);