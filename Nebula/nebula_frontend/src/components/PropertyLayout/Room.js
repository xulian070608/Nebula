import React from 'react';
import wwBuildings from '../../data/building_stats';
import wwFloors from '../../data/floor_stats';

function Room(props) {

    let currentFloor = {}
    let currentProperty = {}

    // let currentRoom = {}
    ////this is currently pending because we don't have UUID for room yet.


    function getCurrentPropertyByFloor(floor, buildings) {
        return buildings.find(building => building.BuildingUUID === floor['Building UUID'])
    }

    function getCurrentFloor(floorUUID, floors) {
        return floors.find(floor => floor['Floor UUID'] === floorUUID)
    }

    currentFloor = getCurrentFloor(props.floorUUID, wwFloors)
    currentProperty = getCurrentPropertyByFloor(currentFloor, wwBuildings)
    console.log(currentProperty)


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