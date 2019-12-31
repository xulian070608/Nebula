import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import wwBuildings from '../../data/building_stats';
import wwFloors from '../../data/floor_stats';
import wwRooms from '../../data/room_stats';
import Card from '../PropertyInfo/Card'
import FloorSelectorOption from './FloorSelectorOption';
import RoomLi from './RoomLi';
import DrawLayout from './DrawLayout';


function PropertyLayout(props) {

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
        />
    }

    return (
        <div>
            <div className="row">
                <div className="column-property">
                    <p> current property is {currentProperty.BuildingName} </p>
                    <Card />
                    <Menu />
                    <p>---------------------------</p>
                    {allRooms.map(CreateRooms)}
                </div>                 
                <div className="column-data">
                    <div>
                        <DrawLayout />
                    </div>
                </div>
            </div>
        </div>
    ) 
}
  

    // const {RoomInfo : {LEVEL2 : level2_rooms}} = HuaiHaiMall
    // const testPolygon = [
    //     30.16732283464587, 54.051835963832076,
    //     30.167322834645844, 39.61614173228355,
    //     38.61548556430391, 39.61614173228352,
    //     38.61548556430391, 40.9284776902887,
    //     38.61548556430392, 43.684383202099795,
    //     40.255905511806446, 43.68438320209979
    // ]

    // return (
    //     <Stage width={900} height={900} options={{ antialias: true, backgroundColor: 0xeef1f5 }}>
    //         <Graphics 
    //             preventRedraw={true}
    //             draw={ g => {

    //                 g.lineStyle(2, 0xFEEB77, 1)
    //                 g.beginFill(0x650A5A)
    //                 g.drawPolygon(testPolygon)
    //                 g.endFill()
    //             }}
    //         />      
    //     </Stage>
    // )

export default PropertyLayout;