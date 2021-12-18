import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadPosts } from "../actions/posts";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((themes) => ({
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: themes.spacing(1),
  },
}));

const Blog = ({ loadPosts, posts }) => {
  const classes = useStyles();
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h1>Discussion Blog</h1>
      <Typography variant="h6" color="primary" className={classes.title}>
        <Link to="/posts/add">
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Add Post
          </Button>
        </Link>
      </Typography>
      {posts && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <h1>user: {post.username}</h1>
                <h2>title: {post.title}</h2>
                <h5>body: {post.body}</h5>
                <Link to={`/posts/${post.id}`}>
                  <h6>Details</h6>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts.posts };
};

export default connect(mapStateToProps, { loadPosts })(Blog);
