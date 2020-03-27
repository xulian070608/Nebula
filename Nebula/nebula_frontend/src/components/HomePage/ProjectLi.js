import React from "react";
import { NavLink } from "react-router-dom";
// import GeoJSONTest from '../../data/GeoJSONTest'

function ProjectLi(props) {
  // let [currentLocation, setCurrentLocation] = useState()

  // const currentProject = () => {
  //     GeoJSONTest.features.find(feature => feature.buildingName === props.propertyName)
  // }

  return (
    <div>
      <NavLink
        to={`/${props.projectID}/summary`}
        activeStyle={{ textDecoration: "none" }}
        // onMouseEnter={setCurrentLocation(currentProject.geometry.coordinates)}
      >
        {props.projectName}
      </NavLink>
    </div>
  );
}

export default ProjectLi;
