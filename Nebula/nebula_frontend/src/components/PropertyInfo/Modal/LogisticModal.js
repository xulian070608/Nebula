import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";

function LogisticModal(props) {
    
    const [modal, setModal] = useState(props.showModal);
    const toggle = () => setModal(!modal);
    
    return props.showModal ? (
        <div style={{zIndex: "100"}}>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Logistic </ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Nobis deserunt corrupti, 
                    ut fugit magni qui quasi nisi amet repellendus non fuga 
                    omnis a sed impedit explicabo accusantium nihil doloremque 
                    consequuntur.
                </ModalBody>
                <ModalFooter> Modal </ModalFooter>
            </Modal>
        </div>
        ) : null 
}

export default LogisticModal;