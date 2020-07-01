// third party package import
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

// local component import
import { MapBox } from "../../components/MapBox/";
import { HighLights } from "../../components/HighLights/";
import { ProjectList } from "../../components/ProjectList";
// material-ui component import
// import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

function Home() {
  const [coordinates, setCoordinates] = useState(null);

  // function updateMapState(){
  //     setCoordinates({
  //         lng: 114.0559,
  //         lat: 22.5458,
  //         zoom: 11
  //         })
  // }

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
    </div>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default Home;
