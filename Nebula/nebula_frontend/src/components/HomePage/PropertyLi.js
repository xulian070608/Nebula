import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GeoJSONTest from '../../data/GeoJSONTest'

function PropertyLi (props) {

    // let [currentLocation, setCurrentLocation] = useState()

    // const currentProject = () => {
    //     GeoJSONTest.features.find(feature => feature.buildingName === props.propertyName)
    // }

    return (
        <div>
            <NavLink 
            to={`/${props.propertyID}/summary`} 
            activeStyle={{textDecoration: "none"}}
            // onMouseEnter={setCurrentLocation(currentProject.geometry.coordinates)}
            >
                {props.propertyName}
            </NavLink> 
        </div>    
    )
}

export default PropertyLi;