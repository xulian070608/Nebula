// third party packages
import React from "react";

// material ui components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(0, 0, 1),
  },
  content: {
    padding: theme.spacing(1, 0, 0),
  },
}));

function CapExModal() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.title}>
        CapEx
      </Typography>
      <Divider />
      <Typography variant="body1" className={classes.content}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt
        corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis
        a sed impedit explicabo accusantium nihil doloremque consequuntur.
      </Typography>
    </Paper>
  );
}

export default CapExModal;
