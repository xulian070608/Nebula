// third party packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// local componenets
import UserProfile from './UserProfile';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  iconNav: {
    marginRight: theme.spacing(8),
  },
  box: {
    flexGrow: 1,
  },
  link: {
    display: 'flex',
    color: '#eeeeee',
    '&:hover': {
      color: '#00adb5',
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    color: '#eeeeee',
  },
  breadCrumbs: {
    color: '#eeeeee',
  },
}));

export function Header() {
  const classes = useStyles();

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <NavLink
          className={classes.iconNav}
          to="/"
          activeStyle={{ textDecoration: 'none' }}
        >
          <img
            className="logo-img"
            src="/img/nebula_01_white_text.svg"
            alt="project quickview"
            width="110"
          />
        </NavLink>
        <Box>
          <UserProfile />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
