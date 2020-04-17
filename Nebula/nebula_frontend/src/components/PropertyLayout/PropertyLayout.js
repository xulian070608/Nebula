import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "reactstrap";
import Viz from "../Utils/Floormap/Viz";

import FloorInfoPanel from "./FloorInfoPanel";

import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

export const CurrentFloorStateContext = React.createContext(null);

function ProjectLayout(props) {
  const currentProjectID = props.projectID;

  // use floor context
  const [currentFloorState, setCurrentFloorState] = useState({
    data: null,
    hasValue: false,
  });

  const value = useMemo(() => ({ currentFloorState, setCurrentFloorState }), [
    currentFloorState,
    setCurrentFloorState,
  ]);

  const { authState } = useOktaAuth();

  return authState.isAuthenticated ? (
    <CurrentFloorStateContext.Provider value={value}>
      <Container>
        <Row>
          <Col xs="4 content-offset" id="project-infopanel-left">
            <FloorInfoPanel projectID={currentProjectID} />
          </Col>
          <Col xs="8 offset-4 content-offset" id="project-infopanel-right">
            {currentFloorState.hasValue ? (
              <Viz
                currentProjectID={currentProjectID}
                floorID={currentFloorState.data.id}
              />
            ) : (
              <p>loading</p>
            )}
          </Col>
        </Row>
      </Container>
    </CurrentFloorStateContext.Provider>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default ProjectLayout;
