import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"
import CreateMap from './Mapbox'
import Highlight from './Highlight'
import DropdownBtn from '../Utils/DropdownBtn'

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
                <Col xs="8">
                    <Row>
                    <Col>
                        <Highlight icon="/icon/icon_reminder.svg"/>
                    </Col>
                    <Col>
                        <Highlight icon="/icon/icon_fix.svg"/>
                    </Col>
                    <Col>
                        <Highlight icon="/icon/icon_notes.svg"/>
                    </Col>
                    <Col>
                        <Highlight icon="/icon/icon_inbox.svg"/>
                    </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs="8" cal>
                    <CreateMap coordinates={coordinates}/>
                </Col>
                <Col xs="4">
                    <div className="n-card-home">
                        <div className="n-card-header">
                            <h4 className="n-card-header-title">Buildings</h4>
                            <DropdownBtn />
                        </div>
                        <hr className="n-card-hr"/>
                        <div className="n-card-body overflow-auto">
                            <ul>
                                {wwBuildings.map(CreatePropertyLi)}
                            </ul>
                            {/* <button onClick={updateMapState}>Test Jump Function</button> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;