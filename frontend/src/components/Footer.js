import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        JobBoard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Box textAlign="center">
              <Copyright />
              <Button to="#" component={RouterLink}>
                <FacebookIcon />
              </Button>
              <Button to="#" component={RouterLink}>
                <TwitterIcon />
              </Button>
              <Button to="#" component={RouterLink}>
                <YouTubeIcon />
              </Button>
            </Box>
          </Typography>
        </Container>
      </footer>
    </div>
  );
  // return (
  //   <footer className={classes.footer}>
  //     <Box px={{ xs: 3, sm: 10 }}>
  //       <Container maxWidth="1g">
  //         <Box textAlign="center" pt={{ xs: 1, sm: 1 }} pb={{ xs: 5, sm: 0 }}>
  //           JobBoard &reg; {new Date().getFullYear()}
  //         </Box>
  //         <Box textAlign="center">
  //           <Button to="#" component={RouterLink}>
  //             <FacebookIcon />
  //           </Button>
  //           <Button to="#" component={RouterLink}>
  //             <TwitterIcon />
  //           </Button>
  //           <Button to="#" component={RouterLink}>
  //             <YouTubeIcon />
  //           </Button>
  //         </Box>
  //       </Container>
  //     </Box>
  //   </footer>
  // );
};

export default Footer;
