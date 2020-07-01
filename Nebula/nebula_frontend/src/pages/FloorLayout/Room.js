import React from "react";
import wwBuildings from "../../data/building_stats";
import wwFloors from "../../data/floor_stats";
import wwRooms from "../../data/room_stats";

function Room(props) {
  let currentRoom = {};
  let currentFloor = {};
  let currentProperty = {};

  // since we don't have roomUUID, here we use buildingName + roomNumber
  let [
    currentBuildingName,
    currentRoomNumber,
  ] = props.buildingNameRoomNumber.split(" - ");

  function getCurrentProperty(buildingName, buildings) {
    return buildings.find((building) => building.BuildingName === buildingName);
  }

  currentProperty = getCurrentProperty(currentBuildingName, wwBuildings);
  console.log(currentProperty);

  function getCurrentRoom(buildingName, roomNumber, rooms) {
    let allRoomsInProperty = rooms.filter(
      (room) => room["Building Name"] === buildingName
    );
    return allRoomsInProperty.find(
      (room) => room["Room Number"] === roomNumber
    );
  }

  currentRoom = getCurrentRoom(currentBuildingName, currentRoomNumber, wwRooms);
  console.log(currentRoom);

  function getCurrentFloor(room, buildingName, floors) {
    let allFloorsInProperty = floors.filter(
      (floor) => floor["Building Name"] === buildingName
    );
    return allFloorsInProperty.find(
      (floor) => floor["Floor Name"] === room["Floor Name"]
    );
  }

  currentFloor = getCurrentFloor(currentRoom, currentBuildingName, wwFloors);
  console.log(currentFloor);

  return (
    <div>
      <p>Room Info</p>
      <p>-----------------------</p>
      <p>Building: {currentRoom["Building Name"]}</p>
      <p>Floor: {currentRoom["Floor Name"]}</p>
      <p>Program Type: {currentRoom["Current Program Type"]}</p>
      <p>Space Type: {currentRoom["Current Space Type"]}</p>
      <p>Room Number: {currentRoom["Room Number"]}</p>
      <p>Room Area (in SF): {currentRoom["Room Sf"]}</p>
      <p>Desk Count: {currentRoom["Room Desk Count"]} </p>
    </div>
  );
}

export default Room;
