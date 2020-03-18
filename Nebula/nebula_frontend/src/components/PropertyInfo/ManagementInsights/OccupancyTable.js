import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import occupancy_stats from '../../../data/occupancy_stats';

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
            <TableCell>Month (BoM)</TableCell>
            <TableCell align="right"># of Offices</TableCell>
            <TableCell align="right">Capacity (Desks)</TableCell>
            <TableCell align="right">Occupancy (Desks)</TableCell>
            <TableCell align="right">Occ % (Desks)</TableCell>
            <TableCell align="right">Desk Churn %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {occupancy_stats.map(row => (
            <TableRow key={row["Month (BoM)"]}>
              <TableCell component="th" scope="row">
                {row["Month (BoM)"]}
              </TableCell>
              <TableCell align="right">{row["# of Offices"]}</TableCell>
              <TableCell align="right">{row["Capacity (Desks)"]}</TableCell>
              <TableCell align="right">{row["Occupancy (Desks)"]}</TableCell>
              <TableCell align="right">{row["Occ % (Desks)"]}</TableCell>
              <TableCell align="right">{row["Desk Churn %"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OccupancyTable;
