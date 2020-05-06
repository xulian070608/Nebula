import React, { useState } from "react";
import ProjectInfoSummary from "./ProjectInfoSummary";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

import ProjectInfoModal from "./Modal/ProjectInfoModal";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function ProjectInfoPanel(props) {
  // this Property Name is coming from it's parent level: Property Overview
  let [currentProject, setCurrentProject] = useState(props.currentProject);
  // console.log(currentProject)

  //selector is using UUID, so here we need to transfer property to projectID
  let [selectProjectID, setSelectProjectID] = useState(currentProject.id);

  const [open, setOpen] = useState(false);
  const allProjects = props.allProjects;
  const classes = useStyles();

  //get Property based on UUID, so that via selector, we can update the "global" current property
  function updateProject(projectID, allProjects) {
    setCurrentProject(allProjects.find((project) => project.id === projectID));
  }

  const DropDown = () => {
    const history = useHistory();
    function onChange(e) {
      updateProject(e.target.value, allProjects);
      setSelectProjectID(e.target.value);
      history.push(`/${e.target.value}/summary`);
      // console.log(history)
    }
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="current-floor-label">Current Project</InputLabel>
        <Select
          labelId="current-floor-label"
          id="current-floor"
          value={selectProjectID}
          onChange={onChange}
        >
          {allProjects.map(createOption)}
        </Select>
      </FormControl>
    );
  };

  const Menu = withRouter(DropDown);

  function createOption(project) {
    return (
      <MenuItem key={project.id} value={project.id}>
        {project.attributes.project_name}
      </MenuItem>
    );
  }

  return (
    <div>
      <Col>
        <h2>{currentProject.attributes.project_name}</h2>
        <img
          className="project-img"
          src="/img/img_001.jpg"
          alt="project quickview"
        />
        <Link to={`/${currentProject.id}/planview`}>Project Plan</Link>
        <p></p>
        <Menu />
        <p></p>
        <ProjectInfoSummary
          //buildingName={currentProject.BuildingName}
          buildingAddress={currentProject.attributes.project_address_en}
          buildingTerritory={currentProject.attributes.project_market}
          // buildingUUID={currentProject.id}
          // buildingUSF={currentProject.BuildingUSF}
          // buildingDeskCount={currentProject.BuildingDeskCount}
          // buildingRoomCount={currentProject.BuildingRoomCount}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          More Info
        </Button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ProjectInfoModal projectID={currentProject.id} />
        </Modal>
      </Col>
    </div>
  );
}

export default ProjectInfoPanel;
