import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import CreateMap from './Mapbox'
import Highlight from './Highlight'
import DropdownBtn from '../Utils/DropdownBtn'
import wwBuildings from '../../data/building_stats'

function Home () {

    let [coordinates, setCoordinates] = useState ({
        lng: 121.4835,
        lat: 31.2291,
        zoom: 12
    })
    let [properties, setProperties] = useState([])

    const propertyURL = "http://127.0.0.1:8000/apis/v1/projects/";

    function getProperties(url) {
        axios
          .get(url)
          .then(res => setProperties(res.data.results))
          .catch(err => console.log(err));
    }

    // get and update property state once DOM is mounted.
    useEffect(() => {getProperties(propertyURL)}, [])

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.building_uuid}
        propertyID={wwBuildings.building_uuid}
        propertyName={wwBuildings.project_name} />
    }

    function updateMapState(){
        setCoordinates({
            lng: 114.0559,
            lat: 22.5458,
            zoom: 11
            })
    }

    console.log("home testing...")

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