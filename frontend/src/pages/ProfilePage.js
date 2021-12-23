import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import EmployeeTabs from "../components/EmployeeTabs";
import EmployerTabs from "../components/EmployerTabs";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import TitleIcon from '@material-ui/icons/Title';
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: 'flex',
  //   },
  title: {
    flexGrow: 1,
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const ProfilePage = ({ user }) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper} elevation={3}>
              <Avatar
              src={user.image}
              classes={{ root: classes.avatar, circle: classes.circle }}
            />
            <Typography variant={"h6"}>{user.first_name} {user.last_name}</Typography>
            <Typography variant={"subtitle1"}>{user.title}</Typography>
            <Typography variant={"body1"}><LocationOnIcon />{user.location}</Typography>
            <Typography variant={"body1"}><PhoneIcon/>{user.phone_number}</Typography>
            <Typography variant={"body1"}><EmailIcon/>{user.email}</Typography>
            <Typography variant={"body1"}><EmailIcon/><a>{user.website}</a></Typography>

        
            </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}><Typography color="primary" variant={"h6"}>Personal Summary</Typography>
              <Typography variant={"subtitle2"}>{user.bio}</Typography></Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {user.is_employer ? <EmployerTabs /> : <EmployeeTabs />}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile,
  };
};

export default connect(mapStateToProps)(ProfilePage);
