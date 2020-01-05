import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"
import CreateMap from './Mapbox'

function Home () {

    let [coordinates, setCoordinates] = useState ({
        lng: 121.4835,
        lat: 31.2291,
        zoom: 12
    })

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.BuildingUUID}
        propertyID={wwBuildings.BuildingUUID}
        propertyName={wwBuildings.MarketingName} />
    }

    function updateMapState(){
        setCoordinates({
            lng: 114.0559,
            lat: 22.5458,
            zoom: 11
            })
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
                    <button onClick={updateMapState}>Jump To Shenzhen</button>
                    <CreateMap coordinates={coordinates}/>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;