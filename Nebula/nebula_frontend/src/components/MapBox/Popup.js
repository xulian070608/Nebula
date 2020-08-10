import React from "react";

import BuildingImagePlaceholder from "../../img/img_001.jpg";

// import Material UI components
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  projectImage: {
    width: 200,
    height: 150,
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "0.25rem",
    position: "relative",
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
