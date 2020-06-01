// third party package import
import React from "react";

// material-ui component import
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import BuildIcon from "@material-ui/icons/Build";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import EmailIcon from "@material-ui/icons/Email";

// material-ui css setting
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    display: "flex",
    width: 170,
    height: 50,
    margin: theme.spacing(6, 1, 2),
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: "bold",
    color: "#6e6e6e",
  },
}));

export default function HighLights() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      <Grid item container lg={9}>
        <Grid item container lg={8} justify="space-between">
          <Button
            variant="outlined"
            color="default"
            size="large"
            className={classes.button}
            startIcon={<AccessAlarmIcon style={{ fontSize: 30 }} />}
          >
            123
          </Button>
          <Button
            variant="outlined"
            color="default"
            size="large"
            className={classes.button}
            startIcon={<BuildIcon style={{ fontSize: 30 }} />}
          >
            123
          </Button>
          <Button
            variant="outlined"
            color="default"
            size="large"
            className={classes.button}
            startIcon={<AnnouncementIcon style={{ fontSize: 30 }} />}
          >
            123
          </Button>
          <Button
            variant="outlined"
            color="default"
            size="large"
            className={classes.button}
            startIcon={<EmailIcon style={{ fontSize: 30 }} />}
          >
            123
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
