import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import ProjectLi from "./ProjectLi";
import CreateMap from "./Mapbox";
import Highlight from "./Highlight";
import DropdownBtn from "../Utils/DropdownBtn";
import { localAPI } from "../Utils/Constant";

function Home() {
  let [
    coordinates
    // , setCoordinates
  ] = useState({
    lng: 121.4835,
    lat: 31.2291,
    zoom: 12
  });

  let [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    axios
      .get(localAPI.getProject)
      .then(res => setAllProjects(res.data.results))
      .catch(err => console.log(err));
  }, []);

  function CreateProjectLi(wwProjects) {
    return (
      <ProjectLi
        key={wwProjects.project_id}
        projectID={wwProjects.project_id}
        projectName={wwProjects.project_name}
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

  return (
    <Container>
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
              <ul>{allProjects.map(CreateProjectLi)}</ul>
            </div>
            {/* <button onClick={updateMapState}>Test Jump Function</button> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
