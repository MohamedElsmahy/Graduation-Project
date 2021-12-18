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

const PostDetails = ({ loadPost, post, comments, userId }) => {
  const classes = useStyles();
  const [postDeleted, setPostDeleted] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadPost(id);
  }, []);

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

  const onSubmit = (e) => {
    e.preventDefault();
    DeletePost();
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              web dev
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
              bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
              bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              mohamed khalid
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              18/12/2021
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
        <form>
          <TextField
            className={classes.field}
            label="post comment"
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
          <h2>
            {post.first_name} {post.last_name}
          </h2>
          <h2>title: {post.title}</h2>
          <h5>body: {post.body}</h5>
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <h3>{comment.user}</h3>
                  <h4>{comment.created}</h4>
                  <h5>{comment.body}</h5>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h5>Post Not Found</h5>
      )}
      {userId === post.user && (
        <form onSubmit={(e) => onSubmit(e)}>
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
    userId: state.profile.id,
  };
};

export default connect(mapStateToProps, { loadPost })(PostDetails);
