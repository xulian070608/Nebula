// third party package import
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

// local component import
import MapBox from '../../components/MapBox/';
import { HighLights } from '../../components/HighLights/';
import { ProjectList } from '../../components/ProjectList';
import { Footer } from '../../components/Footer/';

// material-ui component import
import { Grid } from '@material-ui/core';

export function Home() {
  const [coordinates, setCoordinates] = useState(null);

  const { authState } = useOktaAuth();
  // const { authService } = useOktaAuth()
  // console.log(authService.getUser());
  // console.log(authState.idToken);
  // console.log(authState.accessToken);

  return authState.isAuthenticated ? (
    <div>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6}>
          <HighLights />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6}>
          <MapBox coordinates={coordinates} />
        </Grid>
        <Grid item xs={3}>
          <ProjectList setCoordinates={setCoordinates} />
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        style={{ position: 'absolute', bottom: '10px' }}
      >
        <Footer />
      </Grid>
    </div>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
