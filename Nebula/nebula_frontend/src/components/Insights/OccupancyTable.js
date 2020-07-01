import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import occupancy_stats from "../../data/occupancy_stats";

function OccupancyTable(props) {
  return (
    <Table size="small" aria-label="a dense table" styles={{ height: 350 }}>
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
        {occupancy_stats.map((row) => (
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
  );
}

export default OccupancyTable;
