import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "./Card";
import PropertyInfoPanel from "./PropertyInfoPanel";


function PropertyOverview(props) {


    // current API cannot return the specific property by it's UUID
    // so here still get all property and then use find function
    let [allProperties, setAllProperties] = useState([])
    const allPropertiesURL = "http://127.0.0.1:8000/apis/v1/projects/"
    // const propertyURL = "http://127.0.0.1:8000/apis/v1/projects/?building_uuid=" + props.propertyUUID;

    function getAllProperties(url) {
        axios
          .get(url)
          .then(res => setAllProperties(res.data.results))
          .catch(err => console.log(err));
    }

    useEffect(() => {getAllProperties(allPropertiesURL)}, [])

    let currentProperty = allProperties.find(property => property.building_uuid === props.propertyUUID)
    // console.log(currentProperty)

    return (
        <Container id="property-overview">
            <Row>
                <Col xs="4 content-offset" id="property-infopanel-left">
                    <PropertyInfoPanel 
                    style={{backgroundColor: "0xffd26a"}}
                    currentProperty = {currentProperty}/>
                    {/* {JSON.stringify(currentProperty)} */}
                </Col>
                <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
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