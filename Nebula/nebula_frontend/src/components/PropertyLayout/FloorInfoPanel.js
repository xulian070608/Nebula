import React, { useContext, useEffect } from "react";
import { useFetch, useFetchList } from "../Utils/useFetch";
import Card from "../Utils/Card";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { CurrentFloorStateContext } from "./PropertyLayout";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FloorInfoPanel(props) {
  const currentProjectID = props.projectID;

  // fetch project info data
  const projectInfoAPI =
    "http://api.c3plus.top/nebula/v1/projects/" + currentProjectID;
  const { data: currentProject, loaded: projectLoaded } = useFetch(
    projectInfoAPI
  );

  // fetch project level list
  const floorListAPI =
    "http://api.c3plus.top/nebula/v1/projects/" + currentProjectID + "/floors/";
  const { data: floors, loaded: floorLoaded } = useFetchList(floorListAPI);

  return (
    <div>
      {projectLoaded ? (
        <p>{currentProject.attributes.project_name}</p>
      ) : (
        <p>Loading</p>
      )}
      <Card />
      {floorLoaded ? (
        <div>
          <FloorDropDown floors={floors} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function FloorDropDown(props) {
  const classes = useStyles();
  let { currentFloorState, setCurrentFloorState } = useContext(
    CurrentFloorStateContext
  );
  //   console.log(currentFloorState);
  function onChange(e) {
    const optionFloorID = e.target.value;
    setCurrentFloorState({
      data: props.floors.find((floor) => floor.id === optionFloorID),
      hasValue: true,
    });
  }

  useEffect(
    () =>
      setCurrentFloorState({
        data: props.floors[0],
        hasValue: true,
      }),
    [currentFloorState.hasValue, props.floors, setCurrentFloorState]
  );

  return (
    <div>
      {currentFloorState.data ? (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="current-floor-label">Current Floor</InputLabel>
          <Select
            labelId="current-floor-label"
            id="current-floor"
            // value={currentFloor.id}
            value={currentFloorState.data.id}
            onChange={onChange}
          >
            {props.floors.map(createFloorOption)}
          </Select>
        </FormControl>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

function createFloorOption(floor) {
  return (
    <MenuItem key={floor.id} value={floor.id}>
      {floor.attributes.floor_name}
    </MenuItem>
  );
}

export default FloorInfoPanel;
