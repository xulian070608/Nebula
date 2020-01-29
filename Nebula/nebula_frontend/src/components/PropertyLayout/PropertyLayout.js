import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import wwBuildings from '../../data/building_stats';
import wwFloors from '../../data/floor_stats';
import wwRooms from '../../data/room_stats';
import roomData from '../../data/LayoutSample';
import Card from '../Utils/Card'
import FloorSelectorOption from './FloorSelectorOption';
import RoomLi from './RoomLi';
import DrawLayout from './DrawLayout';
import RoomInfoModal from './Modal/RoomInfoModal'
import renderLocalData from './DrawLayout/init'
import renderEngine from './DrawLayout/init'

// import local data
import HuaiHaiMallAPI from "../../data/HuaiHaiMallFromRESTfulAPI"


function PropertyLayout(props) {

    const base_api = "http://127.0.0.1:8000/apis/v1/rooms/?level_id=";
    const level_uuid = "864bfe52-157d-4667-98a1-279b552e64d6";
    const url = base_api + level_uuid;

    let [modalState, setModalState] = useState(false)
    const toggleModalState = () => {setModalState(!modalState)}

    let currentFloor = {}
    let currentProperty = {}

    function getCurrentPropertyByFloor(floor, buildings) {
        return buildings.find(building => building.BuildingUUID === floor['Building UUID'])
    }

    function getCurrentFloor(floorUUID, floors) {
        return floors.find(floor => floor['Floor UUID'] === floorUUID)
    }

    currentFloor = getCurrentFloor(props.floorUUID, wwFloors)
    currentProperty = getCurrentPropertyByFloor(currentFloor, wwBuildings)
    // console.log(currentProperty)
    // console.log(currentFloor)

    function getAllFloors(buildingUUID, floors) {
        return floors.filter(floor => floor['Building UUID'] === buildingUUID)
    }

    // should be PropertyUUID and FloorUUID, which is not available yet, use Name for now
    function getRoomsByPropertyAndFloor(propertyName, floorName, rooms) {
        let allRoomsInProperty = rooms.filter(room => room['Building Name'] === propertyName)
        return allRoomsInProperty.filter(roomInProperty => roomInProperty['Floor Name'] === floorName)
    }

    const allFloors = getAllFloors(currentProperty.BuildingUUID, wwFloors)
    const allRooms = getRoomsByPropertyAndFloor(currentProperty.BuildingName, currentFloor['Floor Name'], wwRooms)
    // console.log(allRooms)

    //set up selectedFloorUUID so that the selector item is aligned with the actual page
    const [selectedFloorUUID, setSelectedFloorUUID] = useState(allFloors[0])

    // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
    class FloorDropDown extends Component {
        onChange = e => {
            setSelectedFloorUUID(e.target.value)
            this.props.history.push(`/${e.target.value}/planview`)
            };
        
        render() {
            return (
                <select value={selectedFloorUUID} onChange={this.onChange}>
                    {allFloors.map(createFloorOption)}
                </select>)}
    }

    const Menu = withRouter(FloorDropDown)

    function createFloorOption(floor) {
        return <FloorSelectorOption 
        // floorUUID is not ready yet, use floor.Name for now
        key={floor['Floor UUID']}
        name={floor['Floor Name']} 
        value={floor['Floor UUID']}
        />
    }

    function CreateRooms(rooms) {
        return <RoomLi 
            key={rooms['ID']}
            // since we don't have roomUUID for now, here use "building name" + "room number" method:
            id={rooms['Building Name'] + " - " + rooms['Room Number']}
            buildingName={rooms['Building Name']}
            roomNumber={rooms['Room Number']}
            //passing this prop all the way to RoomLi
            toggleModalState={toggleModalState}
        />
    }

    //this part is for debugging and improving the performance

    // use 05-120 as the default selected room
    let [selectedRoom, setSelectedRoom] = useState(roomData)

    const handleRoomSelection = (e) => {
        if(e.target.value === "All Rooms") {
            setSelectedRoom(roomData)
        } else {
            setSelectedRoom([roomData.find(room => room.room_number === e.target.value)])
        }
    } 

    const createRoomOption = (room) => {
        return <option value={room.room_number}>{room.room_number} - {room.room_name}</option>
    }

    function chooseRoom(rooms) {
        return (
            <select 
                value={selectedRoom.room_number}
                onChange={handleRoomSelection}>
                    <option value="All Rooms">All Rooms</option>
                    {rooms.map(createRoomOption)}
                </select>
    )}

    // console.log(HuaiHaiMallAPI.length)

    return (
        <Container>
            <Row>
                <Col xs="4 content-offset" id="property-infopanel-left">
                    <p> current property is {currentProperty.MarketingName} </p>
                    <Card />
                    {/* <button onClick={console.log({selectedRoom})}/> */}
                    <Menu />
                    <p></p>
                    {chooseRoom(roomData)}
                    <p>---------------------------</p>
                    {allRooms.map(CreateRooms)}
                </Col>               
                <Col xs="8 offset-4 content-offset" id="property-infopanel-right">
                    <div id="layout_render" style={{ width: '800px', height: '600px' }}>
                        {/* <DrawLayout 
                            currentProperty={currentProperty}
                            currentFloor={currentFloor}
                            selectedRoom={selectedRoom}
                            //passing this prop all the way to DrawRoom
                            toggleModalState={toggleModalState}
                        /> */}
                        {/* <div>{renderLocalData(HuaiHaiMallAPI)}</div> */}
                        {useEffect(() => renderEngine(url))}
                        {modalState ? 
                        <RoomInfoModal 
                        showModal={modalState} /> 
                        : null}
                    </div>
                </Col>
            </Row>
        </Container>
    ) 
}

export default PropertyLayout;