//third party package import
import React, { useState, useMemo } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

// local components import
import Viz from "../Utils/Floormap/Viz";
import FloorInfoPanel from "./FloorInfoPanel";

// material-ui components import
// import { Container, Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    padding: theme.spacing(4, 6, 0),
  },
}));

export const CurrentFloorStateContext = React.createContext(null);

function ProjectLayout(props) {
  const classes = useStyles();
  const currentProjectID = props.projectID;

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
          <FloorInfoPanel projectID={currentProjectID} />
        </Grid>
        <Grid item lg={8}>
          {currentFloorState.hasValue ? (
            <Viz
              currentProjectID={currentProjectID}
              floorID={currentFloorState.data.id}
            />
          ) : (
            <p>loading</p>
          )}
        </Grid>
      </Grid>
    </CurrentFloorStateContext.Provider>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default ProjectLayout;
