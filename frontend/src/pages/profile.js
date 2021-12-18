import React from "react";
// import { useParams } from "react-router-dom";
import Content from "../hocs/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditProfile from "./EditProfile";
// import { useSelector } from "react-redux";



const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-50px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        Hamoksha
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h3">
          ay haga
        </Typography>
      )}
    </Paper>
  );
}

export default function User() {
//   const { driverId } = useParams();
//   id = id ? id : driverId;
//   const rows = useSelector(selectPeople);
//   let driver = rows.find((row) => row.id === +id);
//   if (!driver) {
//     driver = { name: "hello", id: 3, img: "foo" };
//   }
  const classes = useStyles();
  const loading = false;

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

//   const trips = 4;
//   const distance = 0;
//   const fare = 0;
  return (
    <Content>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Avatar
            // alt={driver.name}
            // src={driver.img}
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography variant={"h5"}>Hamoksha</Typography>
          <Chip variant={"outlined"} icon={<DriveIcon />} label="Employee" />
          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
            <EditProfile
            //   data={driver}
              render={(open) => (
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={open}
                >
                  Edit
                </Button>
              )}
            />
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
}