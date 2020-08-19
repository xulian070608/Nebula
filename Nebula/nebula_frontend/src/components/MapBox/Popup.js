import React from 'react';

import BuildingImagePlaceholder from '../../img/building_img_placeholder.jpg';

// import Material UI components
import { makeStyles } from '@material-ui/core/styles';

// const BuildingImagePlaceholder =
//   'http://cdn.bxia.com.cn/image/building_img_placeholder.jpg';

const useStyles = makeStyles(() => ({
  projectImage: {
    width: 'inherit',
    height: 150,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '0.25rem',
    position: 'relative',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function Popup(props) {
  const { project } = props;
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.projectImage}
        src={
          project.attributes.image[0]
            ? project.attributes.image[0].image
            : BuildingImagePlaceholder
        }
        alt="project quickview"
      />
      <h2>{project.attributes.project_name}</h2>
      <p>USF: {project.attributes.usf}</p>
      <p>Desk: {project.attributes.deskcount}</p>
      <p>Open Date: xxxx-xx-xx</p>
      <button>view detail</button>
    </>
  );
}
