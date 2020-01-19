import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import PropertyLi from './PropertyLi';
import CreateMap from './Mapbox'

function Home () {

    let [coordinates, setCoordinates] = useState ({
        lng: 121.4835,
        lat: 31.2291,
        zoom: 12
    })

    const [properties, setProperties] = useState([])
    const propertyURL = "http://127.0.0.1:8000/apis/v1/projects/";

    function getProperties(url) {
        axios
          .get(url)
          .then(res => setProperties(res.data.results))
          .catch(err => console.log(err));
    }

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

    // get and update property state once DOM is mounted.
    useEffect(() => {getProperties(propertyURL)})

    return (
        <Container>
            <Row>
                <Col>
                <ul>
                    {/* {JSON.stringify(properties[0])} */}
                    {properties.map(CreatePropertyLi)}
                    <button onClick={updateMapState}>Test Jump Function</button>
                </ul>
                </Col>
                <Col>
                    <CreateMap coordinates={coordinates}/>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home;