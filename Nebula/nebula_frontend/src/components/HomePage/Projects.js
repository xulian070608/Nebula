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
    padding: theme.spacing(2, 2, 1),
  },
  content: {
    padding: theme.spacing(0, 0, 2),
    overflowY: "auto",
  },
}));

export default function Projects() {
  const classes = useStyles();
  const { data: projects, loaded } = useFetchList(ProjectsURL);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function createProjectLi(project) {
    return (
      <ListItem button component={Link} to={`/${project.id}/summary`}>
        {project.attributes.project_name}
      </ListItem>
    );
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
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
            {projects.map(createProjectLi)}
          </List>
        ) : (
          <div>loading</div>
        )}
      </CardContent>
    </Card>
  );
}
