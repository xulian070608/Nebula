import React, { Component, useState }from 'react';
import PropertySelectorOption from './PropertySelectorOption'
import PropertyInfoSummary from './PropertyInfoSummary';
import wwBuildings from '../../data/building_stats';
import wwFloors from '../../data/floor_stats';
import { Link, withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';

function PropertyInfoPanel(props) {

    // this Property Name is coming from it's parent level: Property Overview
    const [currentProperty, setCurrentProperty] = useState(props.currentProperty)
    console.log(currentProperty)
    
    //selector is using UUID, so here we need to transfer property to propertyUUID
    const [selectedPropertyUUID, setSelectedPropertyUUID] = useState(currentProperty.BuildingUUID)
    
    //get Property based on UUID, so that via selector, we can update the "global" current property
    function updateProperty(propertyUUID, wwBuildings) {
        setCurrentProperty(wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID))
    }

    //get all floors in current property, this is for hyperlink to planview, so we have a default plan to show
    const allFloor = wwFloors.filter(wwFloor => wwFloor['Building UUID'] === currentProperty.BuildingUUID)

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
                <select 
                value={selectedPropertyUUID} 
                onChange={this.onChange}
                style={{fontSize: "0.5rem"}}>
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

    return <div>
        <Col>
            <h2>{currentProperty.BuildingName}</h2>
            <img className="property-img" src="/img/img_001.jpg" alt="project quickview"/>  
            <Link to={`/${allFloor[0]['Floor UUID']}/planview`}>property Plan</Link>
            <p></p>
            <Menu />
            <p></p>
            <PropertyInfoSummary 
                //buildingName={currentProperty.BuildingName}
                buildingAddress={currentProperty.BuildingAddress}
                buildingTerritory={currentProperty.BuildingTerritory}
                buildingUUID={currentProperty.BuildingUUID}
                buildingUSF={currentProperty.BuildingUSF}
                buildingDeskCount={currentProperty.BuildingDeskCount}
                buildingRoomCount={currentProperty.BuildingRoomCount}
            />
        </Col>
    </div>
}

export default PropertyInfoPanel;