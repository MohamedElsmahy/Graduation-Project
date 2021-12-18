import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MapContainer from "../components/map";
import Content from "../hocs/Content";
import { Message } from "@material-ui/icons";

import { sendInfo } from "../actions/contact";
import CSRFToken from "../components/CSRFToken";

const ContactUs = ({ sendInfo }) => {
  const [infoSent, setInfoSent] = useState(false);

  const [formData, setFormData] = useState({
    phone_number: "",
    email: "",
    message: "",
  });

  const { phone_number, email, message } = formData;

  if (infoSent) return <Navigate replace to="/" />;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    if (sendInfo(phone_number, email, message)) setInfoSent(true);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Card
        style={{
          width: 700,
          marginLeft: "100px",
          marginTop: 70,
          marginBottom: 30,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ gap: 25 }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Contact Us
          </Typography>
          <Grid container item xs={12}>
            <TextField
              required
              id="phone_number"
              name="phone_number"
              value={phone_number}
              onChange={(e) => onChange(e)}
              fullWidth
              label="Phone Number"
              variant="outlined"
              autoComplete="given-name"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              fullWidth
              label="Email"
              variant="outlined"
              autoComplete="given-name"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              required
              id="message"
              name="message"
              value={message}
              onChange={(e) => onChange(e)}
              fullWidth
              multiline
              rows={4}
              label="Message"
              variant="outlined"
              autoComplete="given-name"
            />
          </Grid>

          <Button
            type="submit"
            onClick={() => onClick()}
            variant="contained"
            color="primary"
            disableElevation
          >
            Send Now
          </Button>
        </Grid>
      </Card>
      <Card
        style={{
          width: 500,
          marginRight: "100px",
          marginTop: 70,
          marginBottom: 30,
        }}
      >
        <Grid>
          <MapContainer />
        </Grid>
      </Card>
    </Grid>
  );
};

export default connect(null, { sendInfo })(ContactUs);
