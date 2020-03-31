import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
// import { withRouter } from "react-router-dom";
import Card from "../Utils/Card";
// import FloorSelectorOption from "./FloorSelectorOption";
import { localAPI } from "../Utils/Constant";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

//using floormap.gl
// import FloorMap from "../Utils/Floormap.gl/FloorMap";
import Viz from "../Utils/Floormap/Viz";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function ProjectLayout(props) {
  // let [modalState, setModalState] = useState(false);
  // const toggleModalState = () => {
  //   setModalState(!modalState);
  // };

  const currentProjectID = props.projectID;

  let [isCurrentFloorLoading, setIsCurrentFloorLoading] = useState(true);
  let [isAllFloorLoading, setIsAllFloorLoading] = useState(true);
  let [isLoacaionLoading, setIsLocationLoading] = useState(true);

  let [currentFloor, setCurrentFloor] = useState({});
  let [currentProject, setCurrentProject] = useState({});

  let [allFloors, setAllFloors] = useState([]);
  // set up selectedFloorID so that the selector item is aligned with the actual page
  // let [selectedFloorID, setSelectedFloorID] = useState();
  const classes = useStyles();

  useEffect(() => {
    
    function fetchProjectData() {
      axios
        .get(localAPI.getProject + currentProjectID)
        .then(res => {
          setCurrentProject(res.data);
          setAllFloors(res.data.floors);
          setCurrentFloor(res.data.floors[0]);
          setIsAllFloorLoading(false);
          setIsLocationLoading(false);
          setIsCurrentFloorLoading(false);
        })
        .catch(err => console.log(err));
    }

    fetchProjectData();
  });
  // empty array will run an effect and clean it up only once


  function FloorDropDown() {
    function onChange(e) {
      var optionFloorID = e.target.value;
      setCurrentFloor(
        allFloors.find(floor => floor.floor_id === optionFloorID)
      );
    }

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="current-floor-label">Current Floor</InputLabel>
        <Select
          labelId="current-floor-label"
          id="current-floor"
          value={currentFloor.floor_id}
          onChange={onChange}
        >
          {allFloors.map(createFloorOption)}
        </Select>
      </FormControl>
    );
  }

  // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs

  // const Menu = withRouter(FloorDropDown);

  // function createFloorOption(floor) {
  //   return (
  //     <FloorSelectorOption
  //       // floorID is not ready yet, use floor.Name for now
  //       key={floor.floor_id}
  //       name={floor.floor_name}
  //       value={floor.floor_id}
  //     />
  //   );
  // }

  function createFloorOption(floor) {
    return (
      <MenuItem key={floor.floor_id} value={floor.floor_id}>
        {floor.floor_name}
      </MenuItem>
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
            <div>
              <FloorDropDown />
              <h3>current floor is: {currentFloor.floor_name}</h3>
            </div>
          )}
          <p></p>
        </Col>
        <Col xs="8 offset-4 content-offset" id="project-infopanel-right">
          {isCurrentFloorLoading || isLoacaionLoading ? (
            <p>Loading...</p>
          ) : (
            <Viz id="viz" floor_uuid={currentFloor.floor_id} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectLayout;
