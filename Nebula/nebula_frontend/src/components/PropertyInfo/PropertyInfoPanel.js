import React, { Component, useState, useEffect }from 'react';
import axios from 'axios';
import PropertySelectorOption from './PropertySelectorOption'
import PropertyInfoSummary from './PropertyInfoSummary';
import wwBuildings from '../../data/building_stats';
import wwFloors from '../../data/floor_stats';
import { Link, withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';

function PropertyInfoPanel(props) {

    let [isLoading, setIsLoading] = useState(true)

    // this Property Name is coming from it's parent level: Property Overview
    let [currentProperty, setCurrentProperty] = useState(props.currentProperty)
    // console.log(currentProperty)
    
    //selector is using UUID, so here we need to transfer property to propertyUUID
    let [selectedPropertyUUID, setSelectedPropertyUUID] = useState(currentProperty.building_uuid)

    const allProperties = props.allProperties
    
    //get Property based on UUID, so that via selector, we can update the "global" current property
    function updateProperty(propertyUUID, allProperties) {
        setCurrentProperty(allProperties.find(property => property.building_uuid === propertyUUID))
    }

    //get all floors in current property, this is for hyperlink to planview, so we have a default plan to show
    let [allFloors, setAllFloors] = useState([])
    // const allFloor = wwFloors.filter(wwFloor => wwFloor['Building UUID'] === currentProperty.building_uuid)

    useEffect(() => {
         
        fetchFloorData();
    }, [0]);

    async function fetchFloorData() {      
        axios
            //   .get("http://100.94.22.242:8000/apis/v1/levels/")
            .get("http://127.0.0.1:8000/apis/v1/levels/?project=" + currentProperty.building_uuid)
            .then(res => {
                setAllFloors(res.data.results)
                // console.log(res.data.results)
                setIsLoading(false)
            })
            .catch(err => console.log(err));
    }

    // this is following the example from: https://codesandbox.io/s/falling-surf-33hfs
    class DropDown extends Component {
        onChange = e => {
            updateProperty(e.target.value, allProperties)
            setSelectedPropertyUUID(e.target.value)
            this.props.history.push(`/${e.target.value}/summary`)
          };
        
        render() {
            return (
                <select 
                value={selectedPropertyUUID} 
                onChange={this.onChange}
                style={{fontSize: "0.7rem"}}>
                    {allProperties.map(createOption)}
                </select>)}
    }

    const Menu = withRouter(DropDown)

    function createOption(property) {
        return <PropertySelectorOption 
        key={property.building_uuid}
        name={property.project_name} 
        value={property.building_uuid}
        />
    }

    return <div>
        <Col>
            <h2>{currentProperty.project_name}</h2>
            <img className="property-img" src="/img/img_001.jpg" alt="project quickview"/>  
            {/* <button onClick={fetchFloorData}>Loading...</button> */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Link to={`/${allFloors[0].level_uuid}/planview`}>property Plan</Link>
                // <div>{console.log(allFloors)}</div>
            )}
            <p></p>
            <Menu />
            <p></p>
            <PropertyInfoSummary 
                //buildingName={currentProperty.BuildingName}
                buildingAddress={currentProperty.project_address_en}
                buildingTerritory={currentProperty.project_market}
                buildingUUID={currentProperty.building_uuid}
                // buildingUSF={currentProperty.BuildingUSF}
                // buildingDeskCount={currentProperty.BuildingDeskCount}
                // buildingRoomCount={currentProperty.BuildingRoomCount}
            />
        </Col>
    </div>
}

export default PropertyInfoPanel;