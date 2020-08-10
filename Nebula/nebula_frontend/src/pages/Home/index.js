// third party package import
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

// local component import
import MapBox from '../../components/MapBox/';
import SearchBar from '../../components/MapBox/SearchBar';

// material-ui component import
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
  },
  card: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 600,
    width: '20%',
    height: '100%',
    backgroundColor: 'grey',
    transition: 'width 750ms',
  },
  dashboard: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 600,
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    transition: 'width 750ms',
  },
  navigateIcon: {
    display: 'inline-block',
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

export function Home() {
  const classes = useStyles();
  const [coordinate, setCoordinate] = useState(null);

  const { authState } = useOktaAuth();
  // const { authService } = useOktaAuth()
  // console.log(authService.getUser());
  // console.log(authState.idToken);
  // console.log(authState.accessToken);
  const [showDashboard, setShowDashboard] = useState(false);

  return authState.isAuthenticated ? (
    <div className={classes.root}>
      <MapBox coordinate={coordinate} showDashboard={showDashboard} />
      {showDashboard ? null : <SearchBar setCoordinate={setCoordinate} />}
      <div className={showDashboard ? classes.dashboard : classes.card}>
        <div>
          <IconButton
            className={classes.navigateIcon}
            onClick={() => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h5">
            Overall Status
          </Typography>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
