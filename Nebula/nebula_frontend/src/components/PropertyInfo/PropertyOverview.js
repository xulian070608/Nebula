import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "../Utils/Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import DoughnutChart from "../Utils/DoughnutChart"
import BarChart from "../Utils/BarChart"

//using local JSON data
import wwBuildings from "../../data/building_stats"


function PropertyOverview(props) {

    const [propertyUUID] = useState(props.propertyUUID)

    let currentProperty = {}
    let [allProperties, setAllProperties] = useState([])

    useEffect(() => {
        axios
          .get("http://100.94.22.242:8000/apis/v1/projects/")
          .then(res => setAllProperties(res.data.results))
          .catch(err => console.log(err));
    });

    function getCurrentProperty(propertyUUID, allProperties) {
        currentProperty = allProperties.find(property => property.building_uuid === propertyUUID)
        console.log(currentProperty)
    }

    getCurrentProperty(propertyUUID, allProperties)

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