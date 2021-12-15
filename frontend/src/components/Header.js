import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((themes) => ({
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: themes.spacing(1),
  },
}));


export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
          <Link to="/">Home</Link>
          </Typography>
          
          <Typography variant="h6" color='primary' className={classes.title}>
          <Link to="/jobs">Brwose Jobs</Link>
          </Typography>
          <Typography variant="h6" color='primary' className={classes.title}>
          <Link to="/contactus">Contact Us</Link>
          </Typography>
      
          <Link to="/signin"><Button variant="contained" color="primary" className={classes.margin}>
            Login
          </Button></Link>

        
          <Link to="/signup"><Button variant="contained" color="primary" className={classes.margin}>
             SignUp
          </Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
