import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import service_revenue_stats from "../../../data/service_revenue_stats";

function OccupancyTable(props) {
  return (
    <Table size="small" aria-label="a dense table">
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
        {service_revenue_stats.map((row) => (
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
  );
}

export default OccupancyTable;
