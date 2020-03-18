import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import Card from "../Utils/Card";
import FloorSelectorOption from "./FloorSelectorOption";
import RoomInfoModal from "./Modal/RoomInfoModal";

//using floormap.gl
import FloorMap from "../Utils/FloorMap/FloorMap";


function PropertyLayout(props) {
  let [modalState, setModalState] = useState(false);
  const toggleModalState = () => {
    setModalState(!modalState);
  };

  let [isCurrentFloorLoading, setIsCurrentFloorLoading] = useState(true);
  let [isAllFloorLoading, setIsAllFloorLoading] = useState(true);
  let [isLoacaionLoading, setIsLocationLoading] = useState(true);

  let [currentFloor, setCurrentFloor] = useState({});
  let [currentProperty, setCurrentProperty] = useState({});

  let [allFloors, setAllFloors] = useState([]);

  useEffect(() => {
    fetchLocationData();
    fetchCurrentFloorData();
    fetchAllFloorData();
  }, [0]);

  function fetchAllFloorData() {
    axios
      .get("http://100.94.29.214:8000/apis/v1/levels/")
      // .get("http://127.0.0.1:8000/apis/v1/levels/")
      // for future study how to get this work, re: react component lifecycle...
      // .get("http://127.0.0.1:8000/apis/v1/levels/?project=" + currentProperty.building_uuid)
      .then(res => {
        setAllFloors(res.data.results);
        // console.log(res.data.results)
        setIsAllFloorLoading(false);
      })
      .catch(err => console.log(err));
  }

  function fetchCurrentFloorData() {
    axios
      .get("http://100.94.29.214:8000/apis/v1/levels/")
      // .get("http://127.0.0.1:8000/apis/v1/levels/")
      .then(res => {
        setCurrentFloor(
          res.data.results.find(res => res.level_uuid === props.floorUUID)
        );
        // console.log(res.data.results)
        setIsCurrentFloorLoading(false);
      })
      .catch(err => console.log(err));
  }

  function fetchLocationData() {
    axios
      .get("http://100.94.29.214:8000/apis/v1/projects/")
      // .get("http://127.0.0.1:8000/apis/v1/projects/")
      .then(res => {
        res.data.results.forEach(property => {
          if (
            property.levels.find(level => level.level_uuid === props.floorUUID)
          ) {
            setCurrentProperty(property);
          }
        });
        setIsLocationLoading(false);
      })
      .catch(err => console.log(err));
  }

  // set up selectedFloorUUID so that the selector item is aligned with the actual page
  let [selectedFloorUUID, setSelectedFloorUUID] = useState(allFloors[0]);

  function updateFloor(propertyUUID, allFloors) {
    setCurrentFloor(allFloors.find(floor => floor.level_uuid === propertyUUID));
    console.log("current floor is reset.");
    console.log(currentFloor);
  }

  // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
  class FloorDropDown extends Component {
    onChange = e => {
      updateFloor(e.target.value, allFloors);
      setSelectedFloorUUID(e.target.value);
      this.props.history.push(`/${e.target.value}/planview`);
    };

    render() {
      return (
        <select value={selectedFloorUUID} onChange={this.onChange}>
          {allFloors.map(createFloorOption)}
        </select>
      );
    }
  }

  const Menu = withRouter(FloorDropDown);

  function createFloorOption(floor) {
    return (
      <FloorSelectorOption
        // floorUUID is not ready yet, use floor.Name for now
        key={floor.level_uuid}
        name={floor.level_name}
        value={floor.level_uuid}
      />
    );
  }

  return (
    <Container>
      <Row>
        <Col xs="4 content-offset" id="property-infopanel-left">
          {isCurrentFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <p> current property is {currentProperty.project_name} </p>
          )}
          <Card />
          {isAllFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <Menu />
          )}
          <p></p>
        </Col>
        <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
          {isCurrentFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <FloorMap level_uuid={currentFloor.level_uuid} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyLayout;
