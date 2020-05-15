import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { deepOrange } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  avatarSmall: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  avatarBig: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: "auto",
    marginTop: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: 30,
  },
  popOver: {
    minWidth: theme.spacing(20),
    minHeight: theme.spacing(20),
    padding: theme.spacing(20),
  },
  userName: {
    padding: theme.spacing(2, 2, 0),
  },
  userEmail: {
    padding: theme.spacing(0, 2, 2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return userInfo ? (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Avatar className={classes.avatarSmall}>
          {userInfo.given_name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        className={classes.popOver}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Avatar className={classes.avatarBig}>
          {userInfo.given_name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography align="center" variant="body1" className={classes.userName}>
          {userInfo.name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          className={classes.userEmail}
        >
          {userInfo.email}
        </Typography>
        <List
          component="nav"
          className={classes.list}
          aria-label="mailbox folders"
        >
          <Divider />
          <ListItem button onClick={() => console.log("clicked")}>
            <ListItemText primary="Profile" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              authService.logout();
            }}
          >
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Popover>
    </div>
  ) : null;
}
