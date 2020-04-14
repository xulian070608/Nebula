import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 250
    // backgroundColor: "teal"
  },
  info: {
    fontSize: 16,
    paddingLeft: theme.spacing(2),
    color: 0x424242
  }
}));

function PopperX(props) {
  const classes = useStyles();
  const isTouched = props.isTouched;
  const { roomName, roomNumber, deskCount, physicalDeskCount } = props.roomInfo;
  //   const roomName = props.roomName;
  const [pointX, setPointX] = useState(window.innerWidth / 3);
  const [pointY, setPointY] = useState(window.innerHeight / 10);

  const anchorEl = {
    clientWidth: 0,
    clientHeight: 80,
    getBoundingClientRect: () => {
      return {
        width: 0,
        height: 0,
        top: pointY,
        bottom: pointY,
        right: pointX,
        left: pointX
      };
    }
  };

  const handleResize = () => {
    setPointX(window.innerWidth / 3);
    setPointY(window.innerHeight / 10);
  };

  window.addEventListener("resize", handleResize, false);

  return (
    <Popper
      open={isTouched}
      anchorEl={anchorEl}
      transition
      placement="bottom-start"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Card className={classes.card}>
            <Typography l="5" className={classes.info}>
              Room Name: {roomName}
            </Typography>
            <Typography l="5" className={classes.info}>
              Room Number: {roomNumber}
            </Typography>
            <Typography l="5" className={classes.info}>
              Desk Count: {deskCount}
            </Typography>
            <Typography l="5" className={classes.info}>
              Physical Desk Count: {physicalDeskCount}
            </Typography>
          </Card>
        </Fade>
      )}
    </Popper>
  );
}

export default PopperX;
