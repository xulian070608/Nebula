import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"

function Home () {

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.BuildingUUID}
        propertyID={wwBuildings.BuildingUUID}
        propertyName={wwBuildings.BuildingName} />
    }

    return (
        <Container>
            <Row>
                <Col>
                <ul>
                    {wwBuildings.map(CreatePropertyLi)}
                </ul>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;