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
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  comment: {
    maxWidth: 350,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    textAlign: "center",
  },
  btn: {
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PostDetails = ({ loadPost, post, comments, user, userId }) => {
  const classes = useStyles();
  const [postDeleted, setPostDeleted] = useState(false);
  const [commentBody, setCommentBody] = useState("");

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

  // const deleteComment = => {

  // }

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.body}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {post.first_name} {post.last_name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {post.created}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Comment
          </Button>
        </CardActions>
      </Card>

      <Card className={classes.comment}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AddNewComment();
          }}
        >
          <TextField
            className={classes.field}
            label="post comment"
            name="commentBody"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            variant="outlined"
            color="primary"
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
      </Card>

      {post ? (
        <>
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <h3>
                    {comment.first_name} {comment.last_name}
                  </h3>
                  <h4>{comment.created}</h4>
                  <h5>{comment.body}</h5>
                  {userId === comment.user && (
                    <form
                      onSubmit={(e) => onSubmitDeleteComment(e, comment.id)}
                    >
                      <Button type="submit">
                        <h4>Delete Comment</h4>
                      </Button>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h5>Post Not Found</h5>
      )}
      {userId === post.user && (
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
    userId: state.profile.id,
  };
};

export default connect(mapStateToProps, { loadPost })(PostDetails);
