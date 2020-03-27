import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import Card from "../Utils/Card";
import FloorSelectorOption from "./FloorSelectorOption";
import { serverAPI, localAPI } from "../Utils/Constant";

//using floormap.gl
// import FloorMap from "../Utils/Floormap.gl/FloorMap";
import Viz from "../Utils/Floormap/Viz";

function ProjectLayout(props) {
  // let [modalState, setModalState] = useState(false);
  // const toggleModalState = () => {
  //   setModalState(!modalState);
  // };

  let [isCurrentFloorLoading, setIsCurrentFloorLoading] = useState(true);
  let [isAllFloorLoading, setIsAllFloorLoading] = useState(true);
  let [isLoacaionLoading, setIsLocationLoading] = useState(true);

  let [currentFloor, setCurrentFloor] = useState({});
  let [currentProject, setCurrentProject] = useState({});

  let [allFloors, setAllFloors] = useState([]);

  useEffect(() => {
    fetchLocationData();
    fetchCurrentFloorData();
    fetchAllFloorData();
  }, []);
  // empty array will run an effect and clean it up only once

  function fetchAllFloorData() {
    axios
      .get(serverAPI.getAllFloors)
      // for future study how to get this work, re: react component lifecycle...
      .then(res => {
        setAllFloors(res.data.results);
        // console.log(res.data.results)
        setIsAllFloorLoading(false);
      })
      .catch(err => console.log(err));
  }

  function fetchCurrentFloorData() {
    axios
      .get(serverAPI.getAllFloors)
      .then(res => {
        setCurrentFloor(
          res.data.results.find(res => res.floor_id === props.floorID)
        );
        // console.log(res.data.results)
        setIsCurrentFloorLoading(false);
      })
      .catch(err => console.log(err));
  }

  function fetchLocationData() {
    axios
      .get(serverAPI.getAllProjects)
      .then(res => {
        res.data.results.forEach(project => {
          if (project.floors.find(floor => floor.floor_id === props.floorID)) {
            setCurrentProject(project);
          }
        });
        setIsLocationLoading(false);
      })
      .catch(err => console.log(err));
  }

  // set up selectedFloorID so that the selector item is aligned with the actual page
  let [selectedFloorID, setSelectedFloorID] = useState(allFloors[0]);

  function updateFloor(floorID, allFloors) {
    setCurrentFloor(allFloors.find(floor => floor.floor_id === floorID));
    console.log("current floor is reset.");
    console.log(currentFloor);
  }

  // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
  class FloorDropDown extends Component {
    onChange = e => {
      updateFloor(e.target.value, allFloors);
      setSelectedFloorID(e.target.value);
      this.props.history.push(`/${e.target.value}/planview`);
    };

    render() {
      return (
        <select value={selectedFloorID} onChange={this.onChange}>
          {allFloors.map(createFloorOption)}
        </select>
      );
    }
  }

  const Menu = withRouter(FloorDropDown);

  function createFloorOption(floor) {
    return (
      <FloorSelectorOption
        // floorID is not ready yet, use floor.Name for now
        key={floor.floor_id}
        name={floor.floor_name}
        value={floor.floor_id}
      />
    );
  }

  return (
    <Container>
      <Row>
        <Col xs="4 content-offset" id="project-infopanel-left">
          {isCurrentFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <p> current project is {currentProject.project_name} </p>
          )}
          <Card />
          {isAllFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <Menu />
          )}
          <p></p>
        </Col>
        <Col xs="8 offset-4 content-offset" id="project-infopanel-right">
          {isCurrentFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <Viz floor_uuid={currentFloor.floor_id} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectLayout;
