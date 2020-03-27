import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";
import ms_stats from "../../../data/ms_stats";
import { HorizontalBar } from "react-chartjs-2";

function LogisticModal(props) {
    
    const [modal, setModal] = useState(props.showModal);
    const toggle = () => setModal(!modal);

    const filteredSKU = ms_stats.filter(item => item['PO Status'] === props.selectedPOStatus)

    // to count by the usage of SKU
    let countBySKU = filteredSKU.reduce((map, sku) => {
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

    const { toggleModalState } = props
    
    return props.showModal ? (
        <div style={{zIndex: "100"}}>
            <Modal isOpen={modal} toggle={toggle} onClosed={toggleModalState}>
                <ModalHeader toggle={toggle}> {props.selectedPOStatus} </ModalHeader>
                <ModalBody>

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
                    }}]}}} /> 

                    {/* {JSON.stringify(ms_stats.filter(item => item['PO Status'] === props.selectedPOStatus))} */}
                </ModalBody>
                <ModalFooter> Modal </ModalFooter>
            </Modal>
        </div>
        ) : null 
}

export default LogisticModal;