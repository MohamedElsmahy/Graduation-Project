import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
const useStyle = makeStyles({
  card: {
    boxShadow: 10,
  },
  field: {
    marginTop: 30,
    marginBottom: 30,
    display: "block",
  },
});

const ApplyJob = () => {
  const classes = useStyle();
  return (
    <div>
      <Card
        style={{
          width: 900,
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 100,
          marginBottom: 30,
        }}
        className={classes.card}
      >
        <h1 style={{ marginLeft: 30 ,textAlign:"center"}}>Apply Job</h1>
        <form
          noValidate
          autoComplete="off"
          style={{ width: 850, marginRight: "auto", marginLeft: "auto" }}
        >
          <TextField
            className={classes.field}
            label="name"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            className={classes.field}
            label="email"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <TextField
            className={classes.field}
            label="website"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <Button variant="contained" component="label">
            Upload Cv
            <input type="file" hidden />
          </Button>
          <TextField
            className={classes.field}
            label="cover_letter"
            variant="outlined"
            color="primary"
            fullWidth
            rows={8}
            multiline
            
            required
          />
          <TextField
           style={{
            
            marginBottom: 5,
          }}
            id="datetime-local"
            label="create at"
            type="datetime-local"
            defaultValue="2021-012-17 T9:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br><br></br>
 
          
          
        </form>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          style={{
            background: "#4caf50",
            color: "primary",
            padding: 15,
            fontWeight: "bold",
            fontSize: 15,
            marginTop:5
          }}
          fullWidth
        >
          Apply Now
        </Button>
      </Card>
    </div>
  );
};
export default ApplyJob;
