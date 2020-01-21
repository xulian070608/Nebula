import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "./Card";
import PropertyInfoPanel from "./PropertyInfoPanel";


function PropertyOverview(props) {

    const [currentProperty, setCurrentProperty] = useState({})
    const propertyURL = "http://127.0.0.1:8000/apis/v1/projects/?building_uuid=" + props.propertyUUID;

    function getCurrentProperties(url) {
        axios
          .get(url)
          .then(res => setCurrentProperty(res.data))
          .catch(err => console.log(err));
    }

    // get and update property state once DOM is mounted.
    useEffect(() => {getCurrentProperties(propertyURL)})

    // let currentProperty = {}
    // const [propertyUUID] = useState(props.propertyUUID)

    // function getCurrentProperty(propertyUUID, properties) {
    //     currentProperty = properties.find(property => property.building_uuid === propertyUUID)
    //     // console.log(currentProperty)
    // }

    // getCurrentProperty(propertyUUID, properties)

    return (
        <Container id="property-overview">
            <Row>
                <Col xs="4 content-offset" id="property-infopanel-left">
                    {/* <PropertyInfoPanel 
                    style={{backgroundColor: "0xffd26a"}}
                    currentProperty = {currentProperty}/> */}
                    {JSON.stringify(currentProperty)}
                </Col>
                <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
                    {/* <button onClick={loadData}>Load Data</button>
                    <div>{JSON.stringify(data)}</div> */}
                    <div className="row">
                        <Col>
                            <Card />
                        </Col>
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