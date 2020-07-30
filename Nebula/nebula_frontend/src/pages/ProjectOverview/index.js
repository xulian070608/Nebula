// third party package
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect, useParams } from 'react-router-dom';

// local components
import ProjectInfoPanel from './ProjectInfoPanel';
import ProjectInsights from './ProjectInsights';

import { useFetchList } from '../../utils/useFetch';
import { ProjectsURL } from '../../utils/Constant';

// material ui

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  projectLeftPanel: {
    // position: "absolute",
    padding: theme.spacing(4, 6, 4, 12),
  },
}));

export function ProjectOverview(props) {
  // const [projectID] = useState(props.projectID);
  const { projectID } = useParams();

  const classes = useStyle();

  const { data: projects, loaded } = useFetchList(ProjectsURL);

  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div />;
  }

  return authState.isAuthenticated ? (
    <Grid container className={classes.root}>
      <Grid item lg={4} xs={12}>
        <Container elevation={0} className={classes.projectLeftPanel}>
          {loaded ? (
            <ProjectInfoPanel
              style={{ backgroundColor: '0xffd26a' }}
              currentProject={projects.find(
                (project) => project.id === projectID
              )}
              allProjects={projects}
            />
          ) : (
            <h5>loading...</h5>
          )}
        </Container>
      </Grid>
      <Grid item lg={8}>
        <ProjectInsights />
      </Grid>
    </Grid>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
