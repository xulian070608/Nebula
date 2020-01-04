import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"
import CreateMap from './Mapbox'

function Home () {

    let [newCoordinates, setNewCoordinates] = useState ({})

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.BuildingUUID}
        propertyID={wwBuildings.BuildingUUID}
        propertyName={wwBuildings.MarketingName} />
    }

    function updateMapState(){
        setNewCoordinates({
            lng: 151.4835,
            lat: 21.2291,
            zoom: 6
            })
    }

    return (
        <Container>
            <Row>
                <Col>
                <ul>
                    {wwBuildings.map(CreatePropertyLi)}
                    <button onClick={updateMapState}>Update Map State</button>
                </ul>
                </Col>
                <Col>
                    <CreateMap newCoordinates={newCoordinates}/>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;