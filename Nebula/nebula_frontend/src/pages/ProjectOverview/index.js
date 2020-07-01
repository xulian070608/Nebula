// third party package
import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// local components
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectInsights from "./ProjectInsights";

import { useFetchList } from "../../utils/useFetch";
import { ProjectsURL } from "../../utils/Constant";

// material ui

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyle = makeStyles((theme) => ({
  projectLeftPanel: {
    // position: "absolute",
    padding: theme.spacing(4, 6, 4, 12),
  },
}));

function ProjectOverview(props) {
  // const [projectID] = useState(props.projectID);

  const classes = useStyle();

  const { data: projects, loaded } = useFetchList(ProjectsURL);

  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div />;
  }

  return authState.isAuthenticated ? (
    <Grid container className={classes.root} spacing={1}>
      <Grid item lg={4} xs={12}>
        <Paper elevation={0} className={classes.projectLeftPanel}>
          {loaded ? (
            <ProjectInfoPanel
              style={{ backgroundColor: "0xffd26a" }}
              currentProject={projects.find(
                (project) => project.id === props.projectID
              )}
              allProjects={projects}
            />
          ) : (
            <h5>loading...</h5>
          )}
        </Paper>
      </Grid>
      <Grid item lg={8}>
        <DndProvider backend={HTML5Backend}>
          <ProjectInsights />
        </DndProvider>
      </Grid>
    </Grid>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default ProjectOverview;
