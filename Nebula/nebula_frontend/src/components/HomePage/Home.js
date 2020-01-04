import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"
import CreateMap from './Mapbox'

function Home () {

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.BuildingUUID}
        propertyID={wwBuildings.BuildingUUID}
        propertyName={wwBuildings.MarketingName} />
    }

    return (
        <Container>
            <Row>
                <Col>
                <ul>
                    {wwBuildings.map(CreatePropertyLi)}
                </ul>
                </Col>
                <Col>
                    <CreateMap lng={150} lat={45} zoom={8}/>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;