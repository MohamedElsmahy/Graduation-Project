import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import { Container } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  footer: {
    width: "100%",
    marginTop: "auto",
    backgroundColor: "gray",
    color: "black",
    fontSize: 20,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box px={{ xs: 3, sm: 10 }}>
        <Container maxWidth="1g">
          <Box textAlign="center" pt={{ xs: 1, sm: 1 }} pb={{ xs: 5, sm: 0 }}>
            JobBoard &reg; {new Date().getFullYear()}
          </Box>
          <Box textAlign="center">
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
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
