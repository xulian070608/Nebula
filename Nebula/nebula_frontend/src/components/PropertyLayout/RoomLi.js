import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import RoomInfoModal from './Modal/RoomInfoModal'

function RoomLi(props) {

    // use props.Number as UUID for testing.
    return <div>
        {/* <Link to={`/${props.id}/spaceInfo`}>{props.buildingName} : {props.roomNumber}</Link> */}
        <p>{props.roomNumber} : {props.buildingName}</p>
        {/* <a onClick={setModalState(true)}>{props.buildingName} : {props.roomNumber}</a> */}
    </div>
}

export default RoomLi;