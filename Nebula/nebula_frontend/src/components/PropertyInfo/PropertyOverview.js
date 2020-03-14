import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import Card from "../Utils/Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import LogisticChart from "./LogisticChart";
import MSSKUChart from "./MSSKUChart";
import PropertyCapEx from "./PropertyCapEx";
import ms_stats from "../../data/ms_stats";

function PropertyOverview(props) {

    const [propertyUUID] = useState(props.propertyUUID)

    let [currentProperty, setCurrentProperty] = useState({})
    let [allProperties, setAllProperties] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [isDevelopmentMode, setBusinessMode] = useState(true)

    const logisticData = {
        datasets: [{
            data: [
                ms_stats.filter(item => item['PO Status'] === 'PO Issued').length, 
                ms_stats.filter(item => item['PO Status'] === 'Ordered').length,
                ms_stats.filter(item => item['PO Status'] === 'Shipped').length,
                ms_stats.filter(item => item['PO Status'] === 'Order Cancelled').length,
                ms_stats.filter(item => item['PO Status'] === 'Requires Respec').length
            ],
            backgroundColor: [
                "#F7464A", 
                "#46BFBD", 
                "#FDB45C", 
                "#949FB1", 
                "#4D5360"
            ],
            hoverBackgroundColor: [
                "#FF5A5E",
                "#5AD3D1",
                "#FFC870",
                "#A8B3C5",
                "#616774"
            ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'PO Issued',
            'Ordered',
            'Shipped',
            'Cancelled',
            'Requires Respec'
        ]
    };

    const toggleBusinessMode = () => setBusinessMode(!isDevelopmentMode)

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
                    <button onClick={toggleBusinessMode}>
                    {
                        isDevelopmentMode ? 
                        "Development" :
                        "Management"
                    }
                    </button>

                    <div className="row">
                        <Col>
                            <Card title='CapEx'content={<PropertyCapEx />}/>
                        </Col>
                        <Col>
                            <Card title='Logistics' content={<LogisticChart logisticData={logisticData} />}/>
                        </Col>
                    </div>
                    <div className="row">
                        <Col>
                            <Card title='Loose Furniture (by SKU)' content={<MSSKUChart />}/>
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