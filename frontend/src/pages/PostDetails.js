import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loadPost } from "../actions/posts";
import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  cardcomment: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "25px",
  },
  comment: {
    maxWidth: 750,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    textAlign: "center",
  },
  btn: {
    width: 130,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 7,
  },
  comm: {
    marginLeft: 75,
    marginTop: 5,
    color: "blue",
  },
  Typography1: {
    marginTop: -30,
    marginLeft: 55,
    color: "blue",
  },
  Typography2: {
    marginTop: 10,
    marginLeft: 53,
    fontSize: 25,
  },
  Typography3: {
    marginTop: 20,
    marginLeft: 53,
    fontSize: 15,
  },
  lastcom: {
    marginTop: 20,
    marginLeft: 60,
  },
});

const PostDetails = ({ loadPost, post, comments, user }) => {
  const classes = useStyles();
  const [postDeleted, setPostDeleted] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [show, setshow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadPost(id);
  }, []);

  const AddNewComment = async () => {
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
      post: post.id,
      body: commentBody,
    });

    try {
      const res = await axios.post(
        `http://localhost:8000/blog-api/posts/${post.id}/comments/`,
        body,
        config
      );
      if (res.status === 201) {
        loadPost(id);
        setCommentBody("");
        setshow(!show);
      }
    } catch (err) {}
  };

  const DeleteComment = async (comment_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const res = await axios.delete(
        `http://localhost:8000/blog-api/posts/${id}/comments/${comment_id}/`,
        config
      );
      if (res.status === 204) {
        loadPost(id);
      }
    } catch (err) {}
  };

  const DeletePost = async () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const res = await axios.delete(
        `http://localhost:8000/blog-api/posts/${id}/`,
        config
      );
      if (res.status === 204) {
        setPostDeleted(true);
      }
    } catch (err) {}
  };

  if (postDeleted) return <Navigate replace to="/" />;

  const onSubmitDeletePost = (e) => {
    e.preventDefault();
    DeletePost();
  };

  const onSubmitDeleteComment = (e, comment_id) => {
    e.preventDefault();
    DeleteComment(comment_id);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          subheader={`${post.first_name} ${post.last_name}`}
        />
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Typography1}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.Typography2}
            >
              {post.body}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Typography3}
            >
              {post.created}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={(e) => setshow(!show)}>
            Comment
          </Button>
        </CardActions>
      </Card>

      <div className="comments">
        {show ? (
          <Container className={classes.comment}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddNewComment();
              }}
            >
              <TextField
                className={classes.field}
                label="post comment"
                variant="outlined"
                color="primary"
                name="commentBody"
                value={commentBody}
                onChange={(e) => {
                  setCommentBody(e.target.value);
                }}
                fullWidth
                multiline
                rows={8}
              />
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                disableElevation
                style={{
                  background: "#4caf50",
                  color: "white",
                  padding: 10,
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Add Comment
              </Button>
            </form>
          </Container>
        ) : null}
      </div>

      {post ? (
        <>
          {comments.map((comment) => {
            return (
              <Card key={comment.id} className={classes.cardcomment}>
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  subheader={`${comment.first_name} ${comment.last_name}`}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.comm}
                >
                  {comment.body}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.lastcom}
                >
                  {comment.created}
                </Typography>
              </Card>
            );
          })}
        </>
      ) : (
        <h5>Post Not Found</h5>
      )}
      {user.id === post.user && (
        <form onSubmit={(e) => onSubmitDeletePost(e)}>
          <Button type="submit">
            <h4>Delete Post</h4>
          </Button>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    comments: state.post.comments,
    user: state.profile,
  };
};

export default connect(mapStateToProps, { loadPost })(PostDetails);
