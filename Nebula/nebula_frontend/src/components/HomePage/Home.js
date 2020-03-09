import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import CreateMap from './Mapbox'
import Highlight from './Highlight'
import DropdownBtn from '../Utils/DropdownBtn'

//using local JSON data
import wwBuildings from "../../data/building_stats"

function Home () {

    let [coordinates, setCoordinates] = useState ({
        lng: 121.4835,
        lat: 31.2291,
        zoom: 12
    })

    let [allProperties, setAllProperties] = useState([])

    useEffect(() => {
        axios
          .get("http://100.94.29.214:8000/apis/v1/projects/")
        //   .get("http://127.0.0.1:8000/apis/v1/projects/")
          .then(res => setAllProperties(res.data.results))
          .catch(err => console.log(err));
    });

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
                                {allProperties.map(CreatePropertyLi)}
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