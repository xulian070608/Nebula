import React, { useState } from "react";
// import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "./Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import wwBuildings from "../../data/building_stats"


function PropertyOverview(props) {

    let currentProperty = {}
    const [propertyUUID] = useState(props.propertyUUID)

    function getCurrentProperty(propertyUUID, wwBuildings) {
        currentProperty = wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID)
        // console.log(currentProperty)
    }

    getCurrentProperty(propertyUUID, wwBuildings)

    return (
        <Container>
            <Row>
                <Col>
                    <PropertyInfoPanel 
                    currentProperty = {currentProperty}/>
                </Col>
                <Col>
                    {/* <button onClick={loadData}>Load Data</button>
                    <div>{JSON.stringify(data)}</div> */}
                    <div className="row">
                        <div className="column-50">
                            <Card />
                        </div>
                        <div className="column-50">
                            <Card />
                        </div>
                    </div>
                    <Card />
                    <Card />
                    <Card />
                </Col>
            </Row>
        </Container>
    )
}

export default PropertyOverview;