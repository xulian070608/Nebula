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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  content: {
    height: 600,
    padding: '64px 128px 0',
  },
  card: {
    height: '100%',
  },
  navigateIcon: {
    display: 'inline-block',
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  gridItem: {
    padding: '0 16px',
    transition: 'all 500ms',
  },
  mapWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  iconClose: {
    transform: 'rotate(180deg)',
    transition: 'all 500ms',
  },
}));

export function Home() {
  const classes = useStyles();
  const [coordinate, setCoordinate] = useState(null);

  const { authState } = useOktaAuth();
  const { authService } = useOktaAuth();
  console.log(authService.getUser());
  console.log(authState.idToken);
  console.log(authState.accessToken);
  const [showDashboard, setShowDashboard] = useState(false);

  return authState.isAuthenticated ? (
    <Grid container className={classes.content}>
      <Grid item xs={showDashboard ? 3 : 9} className={classes.gridItem}>
        <div className={classes.mapWrapper}>
          <MapBox coordinate={coordinate} showDashboard={showDashboard} />
          {showDashboard ? null : <SearchBar setCoordinate={setCoordinate} />}
        </div>
      </Grid>
      <Grid item xs={showDashboard ? 9 : 3} className={classes.gridItem}>
        <Box className={classes.card} borderRadius={16} boxShadow={1}>
          <IconButton
            className={classes.navigateIcon}
            onClick={() => setShowDashboard(!showDashboard)}
          >
            <NavigateBeforeIcon
              className={showDashboard ? classes.iconClose : null}
            />
          </IconButton>
          <Typography className={classes.title} variant="h5">
            Overall Status
          </Typography>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
