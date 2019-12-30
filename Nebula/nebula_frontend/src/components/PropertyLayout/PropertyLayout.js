import React from 'react';
import { Stage, Graphics, Polygon } from '@inlet/react-pixi';
import wwBuildings from "../../data/building_stats";
import wwFloors from "../../data/floor_stats"
import HuaiHaiMall from "../../data/HuaiHaiMall_cleaned";
import RoomLi from "./RoomLi"
import FloorSelectorOption from "./FloorSelectorOption";


function PropertyLayout(props) {

    function getCurrentProperty(propertyUUID, wwBuildings) {
        return wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID)
    }

    function getFloorsByPropertyUUID(propertyUUID, wwFloors) {
        return wwFloors.filter(wwFloor => wwFloor['Building UUID'] === propertyUUID)
    }

    const currentProperty = getCurrentProperty(props.propertyUUID, wwBuildings)

    const allFloors = getFloorsByPropertyUUID(currentProperty.BuildingUUID, wwFloors)
    console.log(allFloors)

    // // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
    // class FloorDropDown extends Component {
    //     onChange = e => {
    //         updateFloor(e.target.value, allFloors)
    //         setSelectedFloorUUID(e.target.value)
    //         this.props.history.push(`/${e.target.value}/spaceInfo`)
    //         };
        
    //     render() {
    //         return (
    //             <select value={selectedPropertyUUID} onChange={this.onChange}>
    //                 {allFloors.map(createFloorOption)}
    //             </select>)}
    // }

    // const Menu = withRouter(FloorDropDown)

    function createFloorOption(floor) {
        return <FloorSelectorOption 
        // floorUUID is not ready yet, use floor.Name for now
        key={floor['Floor UUID']}
        name={floor['Floor Name']} 
        value={floor['Floor UUID']}
        />
    }

    // function CreateRooms(rooms) {
    //     return <RoomLi 
    //         category={rooms.category}
    //         LevelId={rooms.LevelId}
    //         Area={rooms.Area}
    //         Number={rooms.Number}
    //         Level={rooms.Level}
    //         ProgramType={rooms.ProgramType}
    //         InternalRoomCount={rooms.InternalRoomCount}
    //         TotalOfficeNumberPercentage={rooms.TotalOfficeNumberPercentage}
    //         Name={rooms.Name}
    //         WorkUnit_Room={rooms.WorkUnit_Room}
    //         PhysicalDeskCount_Room={rooms.PhysicalDeskCount_Room}
    //         DeskCount_Room={rooms.DeskCount_Room}
    //         HasWindow={rooms.HasWindow}
    //         HasAV={rooms.HasAV}
    //         outline={rooms.outline}
    //     />
    // }

    return (
        <div className="card">
            <div>
                <h2>{props.propertyUUID} Placeholder</h2>
            </div>
            <p>this is a {currentProperty.BuildingName}'s plan placeholder</p>
            <select>
                {allFloors.map(createFloorOption)}
            </select>
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