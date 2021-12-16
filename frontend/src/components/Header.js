import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const useStyles = makeStyles((themes) => ({
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: themes.spacing(1),
  },
}));

const Header = ({ isAuthenticated, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <>
      <Typography variant="h6" color="primary" className={classes.title}>
        <Link to="/jobs">
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Brwose Jobs
          </Button>
        </Link>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.title}>
        <Link to="/addjob">
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Add Job
          </Button>
        </Link>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.title}>
        <Link to="/contactus">
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Contact Us
          </Button>
        </Link>
      </Typography>
      <Link to="">
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
          className={classes.margin}
        >
          Logout
        </Button>
      </Link>
    </>
  );
  const guestLinks = (
    <>
      <Link to="/signin">
        <Button variant="contained" color="primary" className={classes.margin}>
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained" color="primary" className={classes.margin}>
          SignUp
        </Button>
      </Link>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                Home
              </Button>
            </Link>
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, { logout })(Header);
