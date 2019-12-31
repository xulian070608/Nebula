import React from 'react';
import { Link } from 'react-router-dom';

function RoomLi(props) {
    // use props.Number as UUID for testing.
    return <div>
        <Link to={`/${props.id}/spaceInfo`}>{props.buildingName} : {props.roomNumber}</Link>
        {/* <p>{props.roomNumber} : {props.buildingName}</p> */}
    </div>
}

export default RoomLi;