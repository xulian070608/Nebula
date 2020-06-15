// third party packages import
import React, { useState } from "react";
import { Link } from "react-router-dom";

// local component import
import { useFetchList } from "../Utils/useFetch";
import { ProjectsURL } from "../Utils/Constant";

// material ui import
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 400,
    margin: theme.spacing(3, 0),
  },
  header: {
    height: 50,
    padding: theme.spacing(2, 2, 1),
  },
  content: {
    height: 350,
    padding: theme.spacing(0),
    overflowY: "auto",
  },
}));

function CreateProjectLi(props) {
  // let { setCoordinates } = useContext(CoordinatesContext);
  const setCoordinates = props.setCoordinates;
  const project = props.project;
  return (
    <ListItem
      button
      key={project.id}
      component={Link}
      to={`/${project.id}/summary`}
      onMouseEnter={() =>
        setCoordinates({
          lng: project.attributes.longitude,
          lat: project.attributes.latitude,
          zoom: 12,
        })
      }
    >
      {project.attributes.project_name}
    </ListItem>
  );
}

export default function Projects(props) {
  const classes = useStyles();
  const { data: projects, loaded } = useFetchList(ProjectsURL);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setCoordinates = props.setCoordinates;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="more" onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Export</MenuItem>
            </Menu>
          </>
        }
        title="Buildings"
        titleTypographyProps={{ variant: "h5" }}
        className={classes.header}
      />
      <Divider />
      <CardContent className={classes.content}>
        {loaded ? (
          <List component="nav" aria-label="secondary mailbox folders">
            {projects.map((project) => (
              <CreateProjectLi
                key={project.id}
                project={project}
                setCoordinates={setCoordinates}
              />
            ))}
          </List>
        ) : (
          <div>loading</div>
        )}
      </CardContent>
    </Card>
  );
}
