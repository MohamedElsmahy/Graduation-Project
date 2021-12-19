import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadPosts } from "../actions/posts";
import CardHeader  from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import  CardActionArea  from "@material-ui/core/CardActionArea";
import  CardContent  from "@material-ui/core/CardContent";
import  CardActions  from "@material-ui/core/CardActions";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Card, Grid } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((themes) => ({
  table: {
    width: 900,
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    maxWidth: 650,
    height:120,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    marginBottom:"30px"
  },
  Typography1:{
    marginTop:-45,
    marginLeft:55,
    color:"blue"
    },
  Typography2:{
    marginTop:-2,
    marginLeft:60
    },
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
        <Button
          to={"/posts/add"}
          variant="contained"
          color="primary"
          component={RouterLink}
          className={classes.margin}
        >
          add Post
        </Button>
      </Typography>
      
      <Card className={classes.root}>
        
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        subheader="mohamed khalid"  
        // {post.username}   
           />
        <CardActions>
        {/* {posts.map((post) => ( */}
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="h2" className={classes.Typography1}>
            <Button to={"/posts/1"} component={RouterLink} style={{color:"blue"}}>
                 {/* to={`/posts/${post.id}`} */}
                    {/* {post.title} */}
                    web dev
                  </Button>
            </Typography>
            <Typography variant="p" color="textSecondary" component="p" className={classes.Typography2}>
               {/* {post.created} */}
               18/12/2021
            </Typography>
         
          </CardContent>
          {/* ))} */}
        </CardActions>
        
      </Card>
      <Card className={classes.root}>
        
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        subheader="mohamed khalid"  
        // {post.username}   
           />
        <CardActions>
        {/* {posts.map((post) => ( */}
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="h2" className={classes.Typography1}>
            <Button to={"/posts/1"} component={RouterLink} style={{color:"blue"}}>
                 {/* to={`/posts/${post.id}`} */}
                    {/* {post.title} */}
                    web dev
                  </Button>
            </Typography>
            <Typography variant="p" color="textSecondary" component="p" className={classes.Typography2}>
               {/* {post.created} */}
               18/12/2021
            </Typography>
         
          </CardContent>
          {/* ))} */}
        </CardActions>
        
      </Card>
       

      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title </StyledTableCell>
              <StyledTableCell align="center">UserName</StyledTableCell>
              <StyledTableCell align="right">CreatedAt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <StyledTableRow key={post.id}>
                <StyledTableCell component="th" scope="row">
                  <Button to={`/posts/${post.id}`} component={RouterLink}>
                    {post.title}
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  {post.username}
                </StyledTableCell>
                <StyledTableCell align="right">{post.created}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* {posts && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <h1>user: {post.username}</h1>
                <h2>title: {post.title}</h2>
                <h4>body: {post.body}</h4>
                <h6 to={`/posts/${post.id}`} component={RouterLink}>
                  Details
                </h6>
              </li>
            );
          })}
        </ul>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts.posts };
};

export default connect(mapStateToProps, { loadPosts })(Blog);
