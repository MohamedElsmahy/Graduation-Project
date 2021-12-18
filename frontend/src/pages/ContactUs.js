import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MapContainer from "../components/map"
import Content from "../hocs/Content"


const ContactUs = () => {
  return (
    <Grid container  
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    >
      <Card
        style={{
          width: 700,
          marginLeft: '100px',
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
            id="phoneNum"
            name="phonenum"
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
          marginRight: '100px',
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


export default ContactUs;