import React, { useState }from "react";
// import PropertySelector from "./PropertySelector"
import PropertySelectorOption from "./PropertySelectorOption"
import PropertyInfo from "./PropertyInfo";
import wwBuildings from "../data/building_stats"

function PropertyInfoPanel(props) {

    // this Property Name is coming from it's parent level: Property Overview
    const currentProperty = props.currentProperty

    const [selectedProperty, setProperty] = useState("Please Select a property to Start")
    const [buildingInfo, setBuildingInfo] = useState({
        buildingName: "",
        buildingAddress: "",
        buildingTerritory: "",
        buildingUUID: "",
        buildingUSF: "",
        buildingDeskCount: "",
        buildingRoomCount: ""
    })

    function handleSelect(event){
        const {value} = event.target;

        setProperty(value) 
        updateBuildingInfo(value, wwBuildings)
    }

    function updateBuildingInfo(selectedBuilding, wwBuildings) {
        wwBuildings.forEach(wwBuilding => {
            if (wwBuilding.BuildingName === selectedBuilding){
                setBuildingInfo({
                    buildingName: wwBuilding.BuildingName,
                    buildingAddress: wwBuilding.BuildingAddress,
                    buildingTerritory: wwBuilding.BuildingTerritory,
                    buildingUUID: wwBuilding.BuildingUUID,
                    buildingUSF: wwBuilding.BuildingUSF,
                    buildingDeskCount: wwBuilding.BuildingDeskCount,
                    buildingRoomCount: wwBuilding.BuildingRoomCount
                })
                // console.log(buildingInfo)
            } 
            // else {
            //     setBuildingInfo("Cannot find building info.")
            //     console.log("cannot find a match")
            // }
        });
    }

    function createOption(wwBuildings) {
        return <PropertySelectorOption 
        key={wwBuildings.BuildingUUID}
        name={wwBuildings.BuildingName} 
        value={wwBuildings.BuildingName}
        />
    }

    // console.log("selectedProperty is " + selectedProperty)

    return <div>
        <h2>{currentProperty}</h2>
        <img className="card" src="/img/img_001.jpg" alt="project quickview"/>
        <p></p>
        Select Property to get start:
        <p></p>
          <select value={selectedProperty} onChange={handleSelect}>
            {wwBuildings.map(createOption)}
          </select>
        <PropertyInfo 
            buildingName={buildingInfo.buildingName}
            buildingAddress={buildingInfo.buildingAddress}
            buildingTerritory={buildingInfo.buildingTerritory}
            buildingUUID={buildingInfo.buildingUUID}
            buildingUSF={buildingInfo.buildingUSF}
            buildingDeskCount={buildingInfo.buildingDeskCount}
            buildingRoomCount={buildingInfo.buildingRoomCount}
        />
    </div>
}

export default PropertyInfoPanel;