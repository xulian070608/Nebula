// third party packages
import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

// local components
import ProjectInfoSummary from './ProjectInfoSummary';
import { ProjectInfoModal } from '../../components/Modals/ProjectInfoModal';
import BuildingImagePlaceholder from '../../img/building_img_placeholder.jpg';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';

// const BuildingImagePlaceholder =
//   'http://cdn.bxia.com.cn/image/building_img_placeholder.jpg';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
    width: 400,
    height: 30,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImage: {
    width: 400,
    height: 300,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '0.25rem',
    position: 'relative',
    padding: '25px 0px',
  },
  projectPlan: {
    margin: theme.spacing(1, 2, 2, 0),
  },
  moreInfo: {
    margin: theme.spacing(1, 0, 2, 2),
  },
  menu: {
    margin: theme.spacing(2, 0, 0),
  },
  select: {
    fontSize: '20px',
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
      history.push('/project/' + e.target.value);
      // console.log(history)
    }
    return (
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="current-floor-label">Current Project</InputLabel> */}
        <Select
          className={classes.select}
          defaultValue={selectProjectID}
          id="current-project"
          onChange={onChange}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
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
      <div>
        <Menu className={classes.menu} />
      </div>
      <img
        className={classes.projectImage}
        src={
          currentProject.attributes.image[0]
            ? currentProject.attributes.image[0].image
            : BuildingImagePlaceholder
        }
        alt="project quickview"
      />
      <Box>
        <Button
          className={classes.projectPlan}
          variant="outlined"
          component={Link}
          to={'/planview/' + currentProject.id}
        >
          Project Plan
        </Button>
        <Button
          className={classes.moreInfo}
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          More Info
        </Button>
      </Box>
      <ProjectInfoSummary
        //buildingName={currentProject.BuildingName}
        buildingAddress={currentProject.attributes.address_en}
        buildingTerritory={currentProject.attributes.market}
        // buildingUUID={currentProject.id}
        // buildingUSF={currentProject.BuildingUSF}
        // buildingDeskCount={currentProject.BuildingDeskCount}
        // buildingRoomCount={currentProject.BuildingRoomCount}
      />
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ProjectInfoModal projectID={currentProject.id} />
      </Modal>
    </div>
  );
}

export default ProjectInfoPanel;
