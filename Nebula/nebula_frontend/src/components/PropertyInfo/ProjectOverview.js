import React, { useState } from "react";
import Card from "../Utils/Card";
import ProjectInfoPanel from "./ProjectInfoPanel";
import LogisticChart from "./DevelopmentInsights/LogisticChart";
import MSSKUChart from "./DevelopmentInsights/MSSKUChart";
import PropertyCapEx from "./DevelopmentInsights/PropertyCapEx";
import OccupancyTable from "./ManagementInsights/OccupancyTable";
import ServiceRecTable from "./ManagementInsights/ServiceRevTable";
import ms_stats from "../../data/ms_stats";
import { useFetchList } from "../Utils/useFetch";
import { ProjectsURL } from "../Utils/Constant";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  projectLeftPanel: {
    padding: theme.spacing(4, 10),
  },
  projectRightPanel: {
    padding: theme.spacing(4, 4),
    // overflowY: "scroll",
  },
}));

function ProjectOverview(props) {
  // const [projectID] = useState(props.projectID);
  let [isDevelopmentMode, setBusinessMode] = useState(true);
  const classes = useStyle();
  const logisticData = {
    datasets: [
      {
        data: [
          ms_stats.filter((item) => item["PO Status"] === "PO Issued").length,
          ms_stats.filter((item) => item["PO Status"] === "Ordered").length,
          ms_stats.filter((item) => item["PO Status"] === "Shipped").length,
          ms_stats.filter((item) => item["PO Status"] === "Order Cancelled")
            .length,
          ms_stats.filter((item) => item["PO Status"] === "Requires Respec")
            .length,
        ],
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      "PO Issued",
      "Ordered",
      "Shipped",
      "Order Cancelled",
      "Requires Respec",
    ],
  };

  const toggleBusinessMode = () => setBusinessMode(!isDevelopmentMode);

  const { data: projects, loaded } = useFetchList(ProjectsURL);

  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div />;
  }

  return authState.isAuthenticated ? (
    <Grid container>
      <Grid item lg={4} xs={6} className={classes.projectLeftPanel}>
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
      </Grid>
      <Grid item lg={8} className={classes.projectRightPanel}>
        <button onClick={toggleBusinessMode}>
          {isDevelopmentMode ? "Development" : "Management"}
        </button>
        {isDevelopmentMode ? (
          //Showing project developement related data:
          <Grid container>
            <Grid container className={classes.infoContainer} spacing={4}>
              <Grid item xs={6}>
                <Card title="CapEx" content={<PropertyCapEx />} />
              </Grid>
              <Grid item xs={6}>
                <Card
                  title="Logistics"
                  content={<LogisticChart logisticData={logisticData} />}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.infoContainer}>
              <Grid item xs={12}>
                <Card
                  title="Loose Furniture (by SKU)"
                  content={<MSSKUChart />}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.infoContainer}>
              <Grid item xs={12}>
                <Card />
              </Grid>
            </Grid>
            <Grid container className={classes.infoContainer}>
              <Grid item xs={12}>
                <Card />
              </Grid>
            </Grid>
            <Grid container className={classes.infoContainer}>
              <Grid item xs={12}>
                <Card />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          // Showing space management related data
          <Grid container>
            <Grid item lg={12}>
              <Card title="Occupancy Metrics" content={<OccupancyTable />} />
            </Grid>
            <Grid item lg={12}>
              <Card title="Events Insights" content={<ServiceRecTable />} />
            </Grid>
            <Grid item lg={12}>
              <Card title="Revenue Insights" content={<OccupancyTable />} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default ProjectOverview;
