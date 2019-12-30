import React, { Component, useState }from "react";
import PropertySelectorOption from "./PropertySelectorOption"
import PropertyInfoSummary from "./PropertyInfoSummary";
import wwBuildings from "../../data/building_stats"
import { Link, withRouter } from "react-router-dom";

function PropertyInfoPanel(props) {

    // this Property Name is coming from it's parent level: Property Overview
    const [currentProperty, setCurrentProperty] = useState(props.currentProperty)
    console.log(currentProperty)
    
    const [selectedPropertyUUID, setSelectedPropertyUUID] = useState(currentProperty.BuildingUUID)
    

    function updateProperty(propertyUUID, wwBuildings) {
        setCurrentProperty(wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID))
    }

    // function handleSelect(event){
    //     const {propertyUUID} = event.target;

    //     setSelectedPropertyUUID(propertyUUID) 
    //     updateProperty(propertyUUID, wwBuildings)
    // }

    // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
    class DropDown extends Component {
        onChange = e => {
            updateProperty(e.target.value, wwBuildings)
            setSelectedPropertyUUID(e.target.value)
            this.props.history.push(`/${e.target.value}/summary`)
          };
        
        render() {
            return (
                <select value={selectedPropertyUUID} onChange={this.onChange}>
                    {wwBuildings.map(createOption)}
                </select>)}
    }

    const Menu = withRouter(DropDown)

    function createOption(wwBuildings) {
        return <PropertySelectorOption 
        key={wwBuildings.BuildingUUID}
        name={wwBuildings.BuildingName} 
        value={wwBuildings.BuildingUUID}
        />
    }

    // console.log("selectedProperty is " + selectedProperty)

    return <div>
        <h2>{currentProperty.BuildingName}</h2>
        <img className="card" src="/img/img_001.jpg" alt="project quickview"/>
        <Link to={`/${currentProperty.BuildingUUID}/planview`}>property Plan</Link>
        <p></p>
        Select Property to get start:
        <p></p>
        <Menu />
        <PropertyInfoSummary 
            buildingName={currentProperty.BuildingName}
            buildingAddress={currentProperty.BuildingAddress}
            buildingTerritory={currentProperty.BuildingTerritory}
            buildingUUID={currentProperty.BuildingUUID}
            buildingUSF={currentProperty.BuildingUSF}
            buildingDeskCount={currentProperty.BuildingDeskCount}
            buildingRoomCount={currentProperty.BuildingRoomCount}
        />
    </div>
}

export default PropertyInfoPanel;