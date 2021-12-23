import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    const res = await axios.get(
      "http://localhost:8000/jobs/api/employer_applications/"
    );
    if (res.status === 200) {
      const data = res.data;
      setApplications(data);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const classes = useStyles();

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Applied At</TableCell>
          <TableCell align="left">Cover Letter</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications &&
          applications.map((row) => (
            <TableRow key={row.id}>
              <TableCell to={`/job/${row.id}`} component={RouterLink}>
                {row.job.title}
              </TableCell>
              {row.applicant_email ? (
                <TableCell to="#" align="left">
                  {row.applicant_email}
                </TableCell>
              ) : (
                <TableCell align="left">{row.email}</TableCell>
              )}

              <TableCell align="left">{row.created_at}</TableCell>
              <TableCell align="left">{row.cover_letter}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default EmployerApplications;
