import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import NativeSelect from '@material-ui/core/NativeSelect';
import { connect } from "react-redux";
// import { add, update } from "../ReduxTable/peopleSlice";
// import { useDispatch } from "react-redux";
// import { nextID } from "../ReduxTable/peopleSlice";
import { updateProfile } from "../actions/profile";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { deleteAccount } from "./../actions/auth";
import { Label } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const EditProfile = ({
  updateProfile,
  first_name_global,
  last_name_global,
  phone_number_global,
  image_global,
  cv_global,
  user_global,
  email_global,
  title_global,
  website_global,
  bio_global,
  location_global,
  emp_global,
  saved_jobs_global,
}) => {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleClose = () => {
    navigate("/profilepage", { replace: true });
  };

  // const handleSave = () => {
  //   const action = data ? update : add;
  //   dispatch(action({ name, id: id || nextID(), img }));
  //   onSave && onSave();
  //   handleClose();
  // };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    image: "",
    cv: "",
    email: "",
    title: "",
    website: "",
    location: "",
    bio: "",
  });

  const {
    first_name,
    last_name,
    phone_number,
    image,
    cv,
    email,
    title,
    website,
    location,
    bio,
  } = formData;

  useEffect(() => {
    setFormData({
      first_name: first_name_global,
      last_name: last_name_global,
      phone_number: phone_number_global,
      image: image_global,
      cv: cv_global,
      title: title_global,
      email: email_global,
      bio: bio_global,
      website: website_global,
      location: location_global,
    });
  }, [first_name_global]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const update = async () => {
    await updateProfile(
      first_name,
      last_name,
      email,
      title,
      phone_number,
      website,
      bio,
      image,
      cv,
      location,
      user_global,
      saved_jobs_global,
    );
    setProfileUpdated(!profileUpdated);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    update();
    navigate("/profilepage", { replace: true });
  };

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <form
          onSubmit={(e) => onSubmit(e)}
          className={classes.form}
          noValidate
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                placeholder={`${first_name_global}`}
                value={first_name}
                onChange={(e) => onChange(e)}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                placeholder={`${last_name_global}`}
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phonenumber"
                label="phone number"
                placeholder={`${phone_number_global}`}
                name="phone_number"
                value={phone_number}
                onChange={(e) => onChange(e)}
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                placeholder={`${email_global}`}
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="title"
                placeholder={`${title_global}`}
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="website"
                label="website"
                placeholder={`${website_global}`}
                name="website"
                value={website}
                onChange={(e) => onChange(e)}
                autoComplete="website"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bio"
                label="bio"
                placeholder={`${bio_global}`}
                name="website"
                value={bio}
                onChange={(e) => onChange(e)}
                autoComplete="bio"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="location"
                placeholder={`${location_global}`}
                name="location"
                value={location}
                onChange={(e) => onChange(e)}
                autoComplete="location"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <h4>image</h4>
              <input
                type="file"
                accept={image_global}
                id="image"
                name="image"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
                  })  
                }
              ></input>
            </Grid>
            <Grid item xs={12} sm={6}>
            <h4>CV</h4>
              <input
                type="file"
                accept={cv_global}
                id="cv"
                name="cv"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
                  })
                }
              ></input>
            </Grid>
          </Grid>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>

        {/* <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            // value={name}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Bio"
            fullWidth
            // value={Bio}
            // onChange={(e) => {
            //   setImg(e.target.value);
            // }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            fullWidth
            // value={img}
            // onChange={(e) => {
            //   setImg(e.target.value);
            // }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Website"
            fullWidth
            // value={img}
            // onChange={(e) => {
            //   setImg(e.target.value);
            // }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            fullWidth
            // value={img}
            // onChange={(e) => {
            //   setImg(e.target.value);
            // }}
          />
          <br />
          <br />
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden />
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" component="label">
            Upload Cv
            <input type="file" hidden />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">Save</Button>
        </DialogActions> */}
        {/* </Dialog> */}
      </Paper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_number_global: state.profile.phone_number,
    image_global: state.profile.image,
    cv_global: state.profile.cv,
    user_global: state.profile.id,
    emp_global: state.profile.is_employer,
    email_global: state.profile.email,
    title_global: state.profile.title,
    location_global: state.profile.location,
    bio_global: state.profile.bio,
    website_global: state.profile.website,
    saved_jobs_global: state.profile.saved_jobs,
  };
};

export default connect(mapStateToProps, { updateProfile })(EditProfile);
