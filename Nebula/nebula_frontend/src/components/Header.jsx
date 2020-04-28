import React from "react";
import { NavLink } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import UserProfile from "./HomePage/UserProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#6e6e6e",
    marginBottom: "16px",
  },
  iconNav: {
    marginRight: theme.spacing(4),
  },
  box: {
    flexGrow: 1,
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: "16px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="absolute">
        <Toolbar>
          <NavLink
            className={classes.iconNav}
            to="/"
            activeStyle={{ textDecoration: "none" }}
          >
            <img
              className="logo-img"
              src="/img/nebula_01_white_text.svg"
              alt="project quickview"
              width="110"
            />
          </NavLink>
          <Box className={classes.box}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Home
              </Link>
              <Link color="inherit" href="#" className={classes.link}>
                <WhatshotIcon className={classes.icon} />
                Buisness
              </Link>
            </Breadcrumbs>
          </Box>
          <Box>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Box>
          <UserProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
