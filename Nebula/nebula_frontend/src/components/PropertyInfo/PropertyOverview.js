import React, { useState } from "react";
// import axios from "axios";
import Card from "./Card";
import PropertyInfoPanel from "./PropertyInfoPanel";
import wwBuildings from "../../data/building_stats"


function PropertyOverview(props) {

    let currentProperty = {}
    const [propertyUUID] = useState(props.propertyUUID)


    function updateProperty(propertyUUID, wwBuildings) {
        currentProperty = wwBuildings.find(wwBuilding => wwBuilding.BuildingUUID === propertyUUID)
        // console.log(currentProperty)
    }

    updateProperty(propertyUUID, wwBuildings)

    return (
        <div>
            <div className="row">
                <div className="column-property">
                    <PropertyInfoPanel 
                    selectedProperty = {propertyUUID}
                    currentProperty = {currentProperty}
                    />
                </div>
                <div className="column-data">
                    {/* <button onClick={loadData}>Load Data</button>
                    <div>{JSON.stringify(data)}</div> */}
                    <div className="row">
                        <div className="column-50">
                            <Card />
                        </div>
                        <div className="column-50">
                            <Card />
                        </div>
                    </div>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default PropertyOverview;