import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import { checkAuth } from "./../actions/auth";
import { loadProfile } from "../actions/profile";
import { loadCategories } from "../actions/jobs";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    gap: 30,
  },
}));

const Layout = ({ children, checkAuth, loadProfile, loadCategories }) => {
  const classes = useStyles();
  useEffect(() => {
    checkAuth();
    loadProfile();
    loadCategories();
  }, []);
  return (
    <div className={classes.root}>
      <NavBar />
      {children}
      <CssBaseline />
      <Footer />
    </div>
  );
};

export default connect(null, { checkAuth, loadProfile, loadCategories })(
  Layout
);
