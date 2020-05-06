import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ProjectLi from "./ProjectLi";
import CreateMap from "./Mapbox";
import Highlight from "./Highlight";
import DropdownBtn from "../Utils/DropdownBtn";
import { useFetchList } from "../Utils/useFetch";
import { ProjectsURL } from "../Utils/Constant";

import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

function Home() {
  let [
    coordinates,
    // , setCoordinates
  ] = useState({
    lng: 121.4835,
    lat: 31.2291,
    zoom: 12,
  });

  const { data: projects, loaded } = useFetchList(ProjectsURL);

  function CreateProjectLi(wwProjects) {
    return (
      <ProjectLi
        key={wwProjects.id}
        projectID={wwProjects.id}
        projectName={wwProjects.attributes.project_name}
      />
    );
  }

  // function updateMapState(){
  //     setCoordinates({
  //         lng: 114.0559,
  //         lat: 22.5458,
  //         zoom: 11
  //         })
  // }

  const { authState } = useOktaAuth();

  return authState.isAuthenticated ? (
    <Container>
      {/* <Row>
        <Link to="/protected">Protected</Link>
      </Row> */}
      <Row>
        <Col xs="8">
          <Row>
            <Col>
              <Highlight icon="/icon/icon_reminder.svg" />
            </Col>
            <Col>
              <Highlight icon="/icon/icon_fix.svg" />
            </Col>
            <Col>
              <Highlight icon="/icon/icon_notes.svg" />
            </Col>
            <Col>
              <Highlight icon="/icon/icon_inbox.svg" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs="8">
          <CreateMap coordinates={coordinates} />
        </Col>
        <Col xs="4">
          <div className="n-card-home">
            <div className="n-card-header">
              <h4 className="n-card-header-title">Buildings</h4>
              <DropdownBtn />
            </div>
            <hr className="n-card-hr" />
            <div className="n-card-body overflow-auto">
              <ul>{loaded ? projects.map(CreateProjectLi) : "loading..."}</ul>
            </div>
            {/* <button onClick={updateMapState}>Test Jump Function</button> */}
          </div>
        </Col>
      </Row>
    </Container>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default Home;
