import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadPosts } from "../actions/posts";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((themes) => ({
  table: {
    width: 900,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: themes.spacing(1),
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(title, username, create_at) {
  return { title, username, create_at };
}
const rows = [createData("web dev", "mohamed khalid", "18/12/2021")];

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
      <TableContainer component={Paper}>
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
      </TableContainer>

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
