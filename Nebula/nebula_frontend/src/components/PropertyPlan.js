import React from 'react';
import wwBuildings from "../data/building_stats"

function PropertyPlan(props) {

    function getCurrentProperty(propertyUUID, wwBuildings) {
        return wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID)
    }

    const currentProperty = getCurrentProperty(props.propertyUUID, wwBuildings)


    return (
        <div className="card">
            <div>
                <h2>{props.propertyUUID} Placeholder</h2>
            </div>
            <p>this is a {currentProperty.BuildingName}'s plan placeholder</p>
        </div>
    )    
}

export default PropertyPlan;