import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import service_revenue_stats from '../../../data/service_revenue_stats';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function OccupancyTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Resource Name</TableCell>
            <TableCell align="right">Revenue Subcategory</TableCell>
            <TableCell align="right">Count of Accounts</TableCell>
            <TableCell align="right">Total # Reservations</TableCell>
            <TableCell align="right">Estimated Net Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {service_revenue_stats.map(row => (
            <TableRow key={row["Resource Name"]}>
              <TableCell component="th" scope="row">
                {row["Resource Name"]}
              </TableCell>
              <TableCell align="right">{row["Revenue Subcategory"]}</TableCell>
              <TableCell align="right">{row["Count of Accounts"]}</TableCell>
              <TableCell align="right">{row["Total # Reservations"]}</TableCell>
              <TableCell align="right">{row["Estimated Net Revenue"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OccupancyTable;
