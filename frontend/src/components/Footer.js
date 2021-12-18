import React from "react";
import  Grid  from "@material-ui/core/Grid";
import  Box  from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

const Footer = () => {
  return (
    <footer>
      <Box px={{xs:3 ,sm:10}} py={{xs:5,sm:10}} style={{background:"gray" ,color:"white",fontSize:20}} >
        <Container maxWidth="1g">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>help</Box>
             <Box>
               <Link to="/" color="inherite" style={{color:"white"}}>
                 Contact
               </Link>
               </Box>
               <Box>
               <Link to="/" color="inherite" style={{color:"white"}} >
                 Support
               </Link>
               </Box>
               <Box>
               <Link to="/" color="inherite" style={{color:"white"}} >
                 Privacy
               </Link>
               </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
             <Box>
               <Link to="/" color="inherite" style={{color:"white"}}>
                 Login
               </Link>
               </Box>
               <Box>
               <Link to="/" color="inherite" style={{color:"white"}}>
                 Register
               </Link>
               </Box>
         
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messeges</Box>
             <Box>
               <Link to="/" color="inherite" style={{color:"white"}}>
                 Backup
               </Link>
               </Box>
               <Box>
               <Link to="/" color="inherite" style={{color:"white"}}>
                 History
               </Link>
               </Box>
              
            </Grid>
          </Grid>
         <Box textAlign="center" pt={{xs:5,sm:10}} pb={{xs:5 ,sm:0}}>
           JobBoard Website &reg; {new Date().getFullYear()}
         </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
