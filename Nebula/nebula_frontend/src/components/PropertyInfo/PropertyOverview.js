import React, { useState } from "react";
// import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "../Utils/Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import wwBuildings from "../../data/building_stats"
import DoughnutChart from "../Utils/DoughnutChart"
import BarChart from "../Utils/BarChart"


function PropertyOverview(props) {

    let currentProperty = {}
    const [propertyUUID] = useState(props.propertyUUID)

    function getCurrentProperty(propertyUUID, wwBuildings) {
        currentProperty = wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID)
        // console.log(currentProperty)
    }

    getCurrentProperty(propertyUUID, wwBuildings)

    return (
        <Container id="property-overview">
            <Row>
                <Col xs="4 content-offset" id="property-infopanel-left">
                    <PropertyInfoPanel 
                    style={{backgroundColor: "0xffd26a"}}
                    currentProperty = {currentProperty}/>
                </Col>
                <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
                    {/* <button onClick={loadData}>Load Data</button>
                    <div>{JSON.stringify(data)}</div> */}
                    <div className="row">
                        <Col>
                            <Card />
                        </Col>
                        <Col>
                            <Card content={<DoughnutChart/>}/>
                        </Col>
                    </div>
                    <div className="row">
                        <Col>
                            <Card content={<BarChart />}/>
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
                </Col>
            </Row>
        </Container>
    )
}

export default PropertyOverview;