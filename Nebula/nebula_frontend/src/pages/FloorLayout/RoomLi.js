import React from 'react';
// import { Link } from 'react-router-dom';

function RoomLi(props) {

    function showModal () {
        return props.toggleModalState(true)
    }

    // use props.Number as UUID for testing.
    return <div>
        {/* <Link to={`/${props.id}/spaceInfo`}>{props.buildingName} : {props.roomNumber}</Link> */}
        {/* <p>{props.roomNumber} : {props.buildingName}</p> */}
        <p onClick={showModal}>{props.buildingName} : {props.roomNumber}</p>
    </div>
}

export default RoomLi;