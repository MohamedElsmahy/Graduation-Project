import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import  Button  from "@material-ui/core/Button";

const useStyle = makeStyles({
    card:{
     boxShadow:10
    
    },
  field: {
    marginTop: 30,
    marginBottom: 30,
    display: "block",
  },
});

const AddJob = () => {
  const classes = useStyle();

  return (
    <div>
      <Card style={{width:900,marginRight:'auto',marginLeft:'auto',marginTop:100,marginBottom:30,}} className={classes.card}>
        <h1 style={{marginLeft:30,textAlign:"center"}}>Add Job</h1>
        <form noValidate autoComplete="off"  style={{width:850,marginRight:'auto',marginLeft:'auto'}}>
          <TextField
            className={classes.field}
            label="title"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
          <FormControl className={classes.field}>
              
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {" "}
              job_type
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: "job_type",
                id: "uncontrolled-native",
              }}
            >
              <option value={null}>__ _ _ _</option>
              <option>Full time</option>
              <option>Part time</option>
            </NativeSelect>
          </FormControl>

          <TextField 
            className={classes.field}
            label="descriptions"
            variant="outlined"
            color="primary"
            multiline
            rows={8}
            fullWidth
            required
            />
            <TextField 
             type="number" label="vacancy" variant="outlined" fullWidth
            /><br/><br/>
               
             <TextField 
             type="number" label="salary" variant="outlined" fullWidth
            />
            <br/><br/>

               <TextField 
             type="number" label="experience" variant="outlined" fullWidth
            /><br/><br/>
            <FormControl className={classes.field}>
              
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                {" "}
                category
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "category",
                  id: "uncontrolled-native",
                }}
              >
                <option value={null}>__ _ _ _</option>
                <option>web developmen</option>
                <option>mobile application</option>
                <option>other</option>
              </NativeSelect>
            </FormControl>
             <FormControl className={classes.field}>
             
             <InputLabel>image</InputLabel>

             <input type="file"/>
              
            </FormControl>
        </form>
        <Button type="submit" variant="contained" disableElevation color="primary" style={{color:"primary",padding:15,fontWeight:'bold',fontSize:15}} fullWidth>
                 Add Now
             </Button>
      </Card>
    </div>
  );
};

export default AddJob;
