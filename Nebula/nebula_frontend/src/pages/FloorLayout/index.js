//third party package import
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect, useParams } from 'react-router-dom';

// local components import
// import Viz from '../../components/Floormap/Viz';
import FloorInfoPanel from './FloorInfoPanel';
import { CurrentFloorStateContext } from '../../utils/ContextManager';

// material-ui components import
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const windowHeight = window.innerHeight - 65;

const Viz = lazy(() => import('../../components/Floormap/Viz'));

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 650,
  },
  projectInfo: {
    height: '100%',
    padding: theme.spacing(4, 6, 0),
  },
  renderer: {
    height: windowHeight,
  },
}));

// export const CurrentFloorStateContext = React.createContext(null);

export function FloorLayout(props) {
  const classes = useStyles();
  const { projectID } = useParams();

  // use floor context
  const [currentFloorState, setCurrentFloorState] = useState({
    data: null,
    hasValue: false,
  });

  const value = useMemo(
    () => ({
      currentFloorState,
      setCurrentFloorState,
    }),
    [currentFloorState, setCurrentFloorState]
  );

  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div />;
  }

  return authState.isAuthenticated ? (
    <CurrentFloorStateContext.Provider value={value}>
      <Grid container className={classes.container}>
        <Grid item lg={4} className={classes.projectInfo}>
          <FloorInfoPanel projectID={projectID} />
        </Grid>
        <Grid item lg={8} className={classes.renderer}>
          {currentFloorState.hasValue ? (
            <Suspense fallback={<div>loading</div>}>
              <Viz
                currentProjectID={projectID}
                floorID={currentFloorState.data.id}
              />
            </Suspense>
          ) : (
            <p>loading</p>
          )}
        </Grid>
      </Grid>
    </CurrentFloorStateContext.Provider>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
