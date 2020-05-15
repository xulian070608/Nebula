import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import UserProfile from "./HomePage/UserProfile";
import SearchBar from "./HomePage/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#393e46",
    marginBottom: "16px",
    zIndex: "50",
  },
  iconNav: {
    marginRight: theme.spacing(8),
  },
  box: {
    flexGrow: 1,
  },
  link: {
    display: "flex",
    color: "#eeeeee",
    "&:hover": {
      color: "#00adb5",
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    color: "#eeeeee",
  },
  breadCrumbs: {
    color: "#eeeeee",
  },
}));

function Header() {
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
            <Breadcrumbs className={classes.breadCrumbs}>
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
            <SearchBar />
          </Box>
          <Box>
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
