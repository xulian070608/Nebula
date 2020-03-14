import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "../Utils/Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import DoughnutChart from "../Utils/DoughnutChart"
import BarChart from "../Utils/BarChart"
import PropertyCapEx from "./PropertyCapEx";

function PropertyOverview(props) {

    const [propertyUUID] = useState(props.propertyUUID)

    let [currentProperty, setCurrentProperty] = useState({})
    let [allProperties, setAllProperties] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
         
        fetchLocationData();
        
    }, [0]);

    async function fetchLocationData() {      
        axios
            //   .get("http://100.94.29.214:8000/apis/v1/projects/")
            .get("http://127.0.0.1:8000/apis/v1/projects/")
            .then(res => {
                setAllProperties(res.data.results)
                setCurrentProperty(res.data.results.find(res => res.building_uuid === propertyUUID))
                // console.log(res.data.results);
                setIsLoading(false)
            })
            .catch(err => console.log(err));
    }

    return (
        <Container id="property-overview">
            <Row>
                <Col xs="4 content-offset" id="property-infopanel-left">
                    {isLoading ? (
                        <h5>loading...</h5>
                    ) : (
                        <PropertyInfoPanel 
                        style={{backgroundColor: "0xffd26a"}}
                        currentProperty = {currentProperty}
                        allProperties = {allProperties}/> 
                    )}   
                </Col>
                <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
                    {/* <button onClick={loadData}>Load Data</button>
                    <div>{JSON.stringify(data)}</div> */}
                    <div className="row">
                        <Col>
                            <Card title='CapEx'content={<PropertyCapEx />}/>
                        </Col>
                        <Col>
                            <Card title='Logistics' content={<DoughnutChart/>}/>
                        </Col>
                    </div>
                    <div className="row">
                        <Col>
                            <Card content={<BarChart />}/>
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