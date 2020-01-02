import React, { useState } from 'react';
// import wwRooms from '../../../data/room_stats'

function RoomInfoModal (props) {

    // let currentRoom = {}
    // // since we don't have roomUUID, here we use buildingName + roomNumber
    // let [currentBuildingName, currentRoomNumber] = props.buildingNameRoomNumber.split(" - ")

    // function getCurrentRoom(buildingName, roomNumber, rooms) {
    //     let allRoomsInProperty = rooms.filter(room => room['Building Name'] === buildingName)
    //     return allRoomsInProperty.find(room => room['Room Number'] === roomNumber)
    // }

    // currentRoom = getCurrentRoom(currentBuildingName, currentRoomNumber, wwRooms)
    // console.log(currentRoom)

    function onClose() {
      return props.show = false;
    };
    
    if(!props.show) {
        return null
    } else {
        return <div>
            <p>Room Info</p>
            <p>-----------------------</p>
            {/* <p>Building: {currentRoom['Building Name']}</p>
            <p>Floor: {currentRoom['Floor Name']}</p>
            <p>Program Type: {currentRoom['Current Program Type']}</p>
            <p>Space Type: {currentRoom['Current Space Type']}</p>
            <p>Room Number: {currentRoom['Room Number']}</p>
            <p>Room Area (in SF): {currentRoom['Room Sf']}</p>
            <p>Desk Count: {currentRoom['Room Desk Count']} </p> */}
            <div>
                <button onClose={onClose}>
                    Close
                </button>
            </div>
        </div>
    }
}

export default RoomInfoModal