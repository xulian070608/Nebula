import React, { useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Container, Row, Col } from 'reactstrap';

function MSSKUChart(props) {
    return (
    <Container>
        <Row>
            <Col>
                <HorizontalBar 
                    data={
                    {
                    "labels": ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
                    "datasets": [{
                    "label": "Most Used SKUs",
                    "data": [22, 33, 55, 12, 86, 23, 14],
                    "fill": false,
                    "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                    ],
                    "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
                    ],
                    "borderWidth": 1
                    }]
                    }
                    }    
                options={
                    {
                "scales": {
                "xAxes": [{
                "ticks": {
                "beginAtZero": true
                }
                }]
                }
                } 
                } />
            </Col>
            <Col>
                <p>
                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. Nobis deserunt corrupti, 
                ut fugit magni qui quasi nisi amet repellendus non fuga 
                omnis a sed impedit explicabo accusantium nihil doloremque 
                consequuntur.
                </p>
            </Col>
        </Row>        
    </Container>
    )
}

export default MSSKUChart;