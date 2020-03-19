import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";
import ms_stats from "../../../data/ms_stats";

function LogisticModal(props) {
    
    const [modal, setModal] = useState(props.showModal);
    const toggle = () => setModal(!modal);

    // const logisticData = {
    //     datasets: [{
    //         data: ms_stats.filter(item => item['PO Status'] === 'PO Issued').slice(0,10),
    //         backgroundColor: [
    //             "#F7464A", 
    //             "#46BFBD", 
    //             "#FDB45C", 
    //             "#949FB1", 
    //             "#4D5360"
    //         ],
    //         hoverBackgroundColor: [
    //             "#FF5A5E",
    //             "#5AD3D1",
    //             "#FFC870",
    //             "#A8B3C5",
    //             "#616774"
    //         ]
    //     }],
    
    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //         'PO Issued',
    //         'Ordered',
    //         'Shipped',
    //         'Cancelled',
    //         'Requires Respec'
    //     ]
    // };
    
    return props.showModal ? (
        <div style={{zIndex: "100"}}>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> {props.selectedPOStatus} </ModalHeader>
                <ModalBody>
                    {JSON.stringify(ms_stats.filter(item => item['PO Status'] === props.selectedPOStatus))}
                </ModalBody>
                <ModalFooter> Modal </ModalFooter>
            </Modal>
        </div>
        ) : null 
}

export default LogisticModal;