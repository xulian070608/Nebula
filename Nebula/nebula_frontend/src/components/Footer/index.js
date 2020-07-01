import React from "react";

// material ui components
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export function Footer() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Nebula
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        浙ICP备20013252号
      </Typography>
    </div>
  );
}
