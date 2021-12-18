import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

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

const AddPost = ({ user }) => {
  const classes = useStyle();

  // const [postBody, setPostBody] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const { postTitle, postBody } = formData;

  const [postCreated, setPostCreated] = useState(false);

  const AddNewPost = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      user: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      title: postTitle,
      body: postBody,
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/blog-api/posts/",
        body,
        config
      );
      if (res.status === 201) {
        setPostCreated(true);
      }
    } catch (err) {}
  };

  if (postCreated) return <Navigate replace to="/blog" />;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AddNewPost();
  };

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
        <h1 style={{ marginLeft: 30 }}>Add Post</h1>
        <form
          onSubmit={(e) => onSubmit(e)}
          noValidate
          autoComplete="off"
          style={{ width: 850, marginRight: "auto", marginLeft: "auto" }}
        >
          <TextField
            className={classes.field}
            label="title"
            name="postTitle"
            variant="outlined"
            color="primary"
            fullWidth
            required
            onChange={(e) => onChange(e)}
          />
          <TextField
            className={classes.field}
            label="Body"
            name="postBody"
            variant="outlined"
            color="primary"
            multiline
            rows={8}
            fullWidth
            required
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            variant="contained"
            disableElevation
            style={{
              background: "#4caf50",
              color: "white",
              padding: 15,
              fontWeight: "bold",
              fontSize: 15,
            }}
            fullWidth
          >
            Add Now
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.profile };
};

export default connect(mapStateToProps)(AddPost);
