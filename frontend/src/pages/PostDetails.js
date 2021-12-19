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
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';





const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  cardcomment:{
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
    marginTop:7
  },
  comm:{
    marginLeft:75,
    marginTop:5,
    color:"blue"
  },
  Typography1:{
  marginTop:-30,
  marginLeft:55,
  color:"blue"
  },
  Typography2:{
    marginTop:10,
    marginLeft:53,
    fontSize:25,
    
    },
    Typography3:{
      marginTop:20,
      marginLeft:53,
      fontSize:15,
      },
  lastcom:{
    marginTop:20,
    marginLeft:60
  }
});

const PostDetails = ({ loadPost, post, comments, userId }) => {
 const [show,setshow]=useState(false)
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
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        subheader="mohamed khalid"
        // {/* {post.first_name} {post.last_name} */}    
           />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.Typography1}>
              web dev
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.Typography2}>
              {/* {post.body} */}
              bodu body bodybodyvvbodybodybody 
            </Typography>
            
            <Typography gutterBottom variant="h5" component="h2" className={classes.Typography3}>
              {/* {post.created} */}
              18/12/2021
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={(e)=>setshow(!show)}>
            Comment
          </Button>
         
        </CardActions>
      </Card>

      <div className="comments">
        {
          show?
          <Container className={classes.comment}>
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
          </Container>:null
        }
      </div>
      <Card  className={classes.cardcomment} >
            
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    subheader="mohamed khalid"    
                  />
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.comm}>
                    web dev comment
                   </Typography>           
                   <Typography variant="body2" color="textSecondary" component="p" className={classes.lastcom}>
              create at
             </Typography>
              
      </Card>
      <Card  className={classes.cardcomment} >
            
            <CardHeader
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              subheader="mohamed khalid"    
            />
            <Typography variant="body2" color="textSecondary" component="p" className={classes.comm}>
              web dev comment
             </Typography>  
             <Typography variant="body2" color="textSecondary" component="p" className={classes.lastcom}>
              create at
             </Typography>         
        
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
