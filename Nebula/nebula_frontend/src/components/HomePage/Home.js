// third party package import
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

// local component import
import CreateMap from "./Mapbox";
import ProjectLi from "./ProjectLi";
// import Highlight from "./Highlight";
import HighLights from "./HighLight2";
import { useFetchList } from "../Utils/useFetch";
import DropdownBtn from "../Utils/DropdownBtn";
import { ProjectsURL } from "../Utils/Constant";

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

  const { data: projects, loaded } = useFetchList(ProjectsURL);

  function CreateProjectLi(wwProjects) {
    return (
      <ProjectLi
        key={wwProjects.id}
        projectID={wwProjects.id}
        projectName={wwProjects.attributes.project_name}
      />
    );
  }

  // function updateMapState(){
  //     setCoordinates({
  //         lng: 114.0559,
  //         lat: 22.5458,
  //         zoom: 11
  //         })
  // }

  const { authState } = useOktaAuth();

  return authState.isAuthenticated ? (
    <div>
      <HighLights />
      <Grid container spacing={2} justify="center">
        <Grid item lg={6}>
          <CreateMap coordinates={coordinates} />
        </Grid>
        <Grid item lg={3}>
          <div className="n-card-home">
            <div className="n-card-header">
              <h4 className="n-card-header-title">Buildings</h4>
              <DropdownBtn />
            </div>
            <hr className="n-card-hr" />
            <div className="n-card-body overflow-auto">
              <ul>{loaded ? projects.map(CreateProjectLi) : "loading..."}</ul>
            </div>
            {/* <button onClick={updateMapState}>Test Jump Function</button> */}
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default Home;
