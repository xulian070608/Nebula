import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CapExModal from '../Modal/CapExModal';

function PropertyCapEx(props) {

    let [modalState, setModalState] = useState(false)
    const toggleModalState = () => {setModalState(!modalState)}

    return( 
    <Container>
        <Row>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </Row>
        <Row>
            <Col>
                <h3> XX $/SQF </h3>
            </Col>
            <Col>
                <ul>
                    <li>item 01</li>
                    <li>item 02</li>
                    <li>item 03</li>
                    <li>item 04</li>
                </ul>
                <button onClick={toggleModalState}>View Details</button>
                {console.log(modalState)}
                {modalState ? 
                <CapExModal 
                showModal={modalState}
                toggleModalState={toggleModalState} /> 
                : null}
            </Col>
        </Row>
    </Container>
    )
}

export default PropertyCapEx;