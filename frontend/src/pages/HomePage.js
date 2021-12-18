import React, { useEffect } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPosts } from '../actions/posts';


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((themes) => ({
  table:{
    width:900,
    marginLeft:"auto",
    marginRight:"auto"
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(title, username, create_at) {
  return { title, username, create_at };
}
const rows = [
  createData('web dev'
  , 'mohamed khalid',
  '18/12/2021'),
  

];


const HomePage = ({ loadPosts, posts }) => {
  const classes = useStyles();
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
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
            <StyledTableCell >Title </StyledTableCell>
            <StyledTableCell align="center">UserName</StyledTableCell>
            <StyledTableCell align="right">CreatedAt</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title} >
              <StyledTableCell component="th" scope="row" >
              <Button to={"posts/1/"}   component={RouterLink}>{row.title}</Button>
                
              
              </StyledTableCell>
              
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="right">{row.create_at}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      {posts && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <h5>{post.body}</h5>
                
                  <h6  to={`/posts/${post.id}`}  component={RouterLink}>Details</h6>
                
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

export default connect(mapStateToProps, { loadPosts })(HomePage);
