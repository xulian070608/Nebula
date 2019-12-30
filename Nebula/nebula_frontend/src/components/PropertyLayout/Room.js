import React from 'react';
import HuaiHaiMall from '../../data/HuaiHaiMall_cleaned'

function Room(props) {

    function getSpaceInfo() {
        // use props.spaceUUID to find the space and get the info.
    }

    const {RoomInfo : {LEVEL2 : level2_rooms}} = HuaiHaiMall

    return <div>
        <p>{props.category}</p>
        <p>{props.levelId}</p>
        <p>{props.area}</p>
        <p>{props.number}</p>
        <p>{props.level}</p>
        <p>{props.programType}</p>
        <p>{props.internalRoomCount}</p>
        <p>{props.totalOfficeNumberPercentage}</p>
        <p>{props.name}</p>
        <p>{props.workUnit_Room}</p>
        <p>{props.physicalDeskCount_Room}</p>
        <p>{props.deskCount_Room}</p>
        <p>{props.hasWindow}</p>
        <p>{props.hasAV}</p>
        <p>{props.outline}</p>
    </div>
}

export default Room;