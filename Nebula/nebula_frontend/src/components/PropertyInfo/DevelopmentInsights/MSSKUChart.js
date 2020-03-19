import React, { useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Container, Row, Col } from 'reactstrap';
import LogisticModal from './../Modal/LogisticModal';

import ms_stats from "../../../data/ms_stats";

function MSSKUChart(props) {

    let [modalState, setModalState] = useState(false)
    const toggleModalState = () => {setModalState(!modalState)}

    // to count by the usage of SKU
    let countBySKU = ms_stats.reduce((map, sku) => {
        map[sku.WWSKU] = (map[sku.WWSKU] || 0) + 1;
        return map;
    }, {});

    let sortable = []
    for (var sku in countBySKU) {
        sortable.push([sku, countBySKU[sku]]);
    }

    let sortBySKU = sortable.sort((a,b) => b[1] - a[1])
    let topUsed = sortBySKU.slice(0, 7)

    var SKUObjSorted = {}
    topUsed.forEach(function(sku){
    SKUObjSorted[sku[0]]=sku[1]
    })

    return (
    <Container>
        <Row>
            <Col>
                <HorizontalBar 
                    data={
                    {
                    "labels": Object.keys(SKUObjSorted),
                    "datasets": [{
                    "label": "",
                    "data": Object.values(SKUObjSorted),
                    "fill": false,
                    "backgroundColor": ["rgba(255, 99, 132, 0.4)", "rgba(255, 159, 64, 0.4)",
                    "rgba(255, 205, 86, 0.4)", "rgba(75, 192, 192, 0.4)", "rgba(54, 162, 235, 0.4)",
                    "rgba(153, 102, 255, 0.4)", "rgba(201, 203, 207, 0.4)"
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
                }}]}}} 
                onElementsClick={elems => {
                    toggleModalState()
                    console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
                }}
                />
                {console.log(Object.keys(SKUObjSorted))}
                {modalState ? 
                <LogisticModal 
                showModal={modalState} /> 
                : null}
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