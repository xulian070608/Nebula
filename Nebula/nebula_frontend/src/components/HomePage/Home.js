// third party package import
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

// local component import
import CreateMap from "./Mapbox";
import HighLights from "./HighLight";
import Projects from "./Projects";

// material-ui component import
// import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

function Home() {
  let [
    coordinates,
    // , setCoordinates
  ] = useState({
    lng: 121.4835,
    lat: 31.2291,
    zoom: 12,
  });

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

  return authState.isAuthenticated ? (
    <div>
      <HighLights />
      <Grid container spacing={2} justify="center">
        <Grid item lg={6}>
          <CreateMap coordinates={coordinates} />
        </Grid>
        <Grid item lg={3}>
          <Projects />
        </Grid>
      </Grid>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default Home;
