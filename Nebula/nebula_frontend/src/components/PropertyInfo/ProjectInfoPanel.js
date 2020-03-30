import React, { Component, useState } from "react";
import ProjectSelectorOption from "./ProjectSelectorOption";
import ProjectInfoSummary from "./ProjectInfoSummary";
import { Link, withRouter } from "react-router-dom";
import { Col } from "reactstrap";

function ProjectInfoPanel(props) {
  // this Property Name is coming from it's parent level: Property Overview
  let [currentProject, setCurrentProject] = useState(props.currentProject);
  // console.log(currentProject)

  //selector is using UUID, so here we need to transfer property to projectID
  let [selectProjectID, setSelectProjectID] = useState(
    currentProject.project_id
  );

  const allProjects = props.allProjects;

  //get Property based on UUID, so that via selector, we can update the "global" current property
  function updateProject(projectID, allProjects) {
    setCurrentProject(
      allProjects.find(property => property.project_id === projectID)
    );
  }

  // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
  class DropDown extends Component {
    onChange = e => {
      updateProject(e.target.value, allProjects);
      setSelectProjectID(e.target.value);
      this.props.history.push(`/${e.target.value}/summary`);
    };

    render() {
      return (
        <select
          value={selectProjectID}
          onChange={this.onChange}
          style={{ fontSize: "0.7rem" }}
        >
          {allProjects.map(createOption)}
        </select>
      );
    }
  }

  const Menu = withRouter(DropDown);

  function createOption(project) {
    return (
      <ProjectSelectorOption
        key={project.project_id}
        name={project.project_name}
        value={project.project_id}
      />
    );
  }

  return (
    <div>
      <Col>
        <h2>{currentProject.project_name}</h2>
        <img
          className="project-img"
          src="/img/img_001.jpg"
          alt="project quickview"
        />
        <Link to={`/${currentProject.project_id}/planview`}>Project Plan</Link>
        <p></p>
        <Menu />
        <p></p>
        <ProjectInfoSummary
          //buildingName={currentProject.BuildingName}
          buildingAddress={currentProject.project_address_en}
          buildingTerritory={currentProject.project_market}
          buildingUUID={currentProject.project_id}
          // buildingUSF={currentProject.BuildingUSF}
          // buildingDeskCount={currentProject.BuildingDeskCount}
          // buildingRoomCount={currentProject.BuildingRoomCount}
        />
      </Col>
    </div>
  );
}

export default ProjectInfoPanel;
