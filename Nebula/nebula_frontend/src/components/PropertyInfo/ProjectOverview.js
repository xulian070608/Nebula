import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Card from "../Utils/Card";
import ProjectInfoPanel from "./ProjectInfoPanel";
import LogisticChart from "./DevelopmentInsights/LogisticChart";
import MSSKUChart from "./DevelopmentInsights/MSSKUChart";
import PropertyCapEx from "./DevelopmentInsights/PropertyCapEx";
import OccupancyTable from "./ManagementInsights/OccupancyTable";
import ServiceRecTable from "./ManagementInsights/ServiceRevTable";
import ms_stats from "../../data/ms_stats";
import { localAPI } from "../Utils/Constant";

function ProjectOverview(props) {
  // const [projectID] = useState(props.projectID);

  let [currentProject, setCurrentProject] = useState({});
  let [allProjects, setAllProjects] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isDevelopmentMode, setBusinessMode] = useState(true);

  const logisticData = {
    datasets: [
      {
        data: [
          ms_stats.filter(item => item["PO Status"] === "PO Issued").length,
          ms_stats.filter(item => item["PO Status"] === "Ordered").length,
          ms_stats.filter(item => item["PO Status"] === "Shipped").length,
          ms_stats.filter(item => item["PO Status"] === "Order Cancelled")
            .length,
          ms_stats.filter(item => item["PO Status"] === "Requires Respec")
            .length
        ],
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360"
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      "PO Issued",
      "Ordered",
      "Shipped",
      "Order Cancelled",
      "Requires Respec"
    ]
  };

  const toggleBusinessMode = () => setBusinessMode(!isDevelopmentMode);

  useEffect(() => {
    // move [projectID] & fetchLocationData into useEffect to avoid "missing dependency" warning
    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

    const fetchLocationData = () => {
      axios
        .get("http://100.94.29.214/api/v1/projects/")
        .then(res => {
          setAllProjects(res.data.data);
          setCurrentProject(
            res.data.data.find(res => res.id === props.projectID)
          );
          // console.log(res.data.results);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    };

    fetchLocationData();
  }, [props.projectID]);

  // async function fetchLocationData() {
  //   axios
  //     .get(localAPI.getProject)
  //     .then(res => {
  //       setAllProjects(res.data.results);
  //       setCurrentProject(
  //         res.data.results.find(res => res.project_id === projectID)
  //       );
  //       // console.log(res.data.results);
  //       setIsLoading(false);
  //     })
  //     .catch(err => console.log(err));
  // }

  return (
    <Container id="project-overview">
      <Row>
        <Col xs="4 content-offset" id="project-infopanel-left">
          {isLoading ? (
            <h5>loading...</h5>
          ) : (
            <ProjectInfoPanel
              style={{ backgroundColor: "0xffd26a" }}
              currentProject={currentProject}
              allProjects={allProjects}
            />
          )}
        </Col>
        <Col xs="8 offset-4 content-offset" id="project-infopanel-right">
          <button onClick={toggleBusinessMode}>
            {isDevelopmentMode ? "Development" : "Management"}
          </button>

          {isDevelopmentMode ? (
            //Showing project developement related data:
            <div>
              <div className="row">
                <Col>
                  <Card title="CapEx" content={<PropertyCapEx />} />
                </Col>
                <Col>
                  <Card
                    title="Logistics"
                    content={<LogisticChart logisticData={logisticData} />}
                  />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card
                    title="Loose Furniture (by SKU)"
                    content={<MSSKUChart />}
                  />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card />
                </Col>
              </div>
            </div>
          ) : (
            // Showing space management related data
            <div>
              <div className="row">
                <Col>
                  <Card
                    title="Occupancy Metrics"
                    content={<OccupancyTable />}
                  />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card title="Events Insights" content={<ServiceRecTable />} />
                </Col>
              </div>
              <div className="row">
                <Col>
                  <Card title="Revenue Insights" content={<OccupancyTable />} />
                </Col>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectOverview;
