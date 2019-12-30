import React from 'react';
import PropertyLi from './PropertyLi';
import wwBuildings from "../../data/building_stats"

function Home () {

    function CreatePropertyLi(wwBuildings) {
        return <PropertyLi 
        key={wwBuildings.BuildingUUID}
        propertyID={wwBuildings.BuildingUUID}
        propertyName={wwBuildings.BuildingName} />
    }

    return (
        <ul>
            {wwBuildings.map(CreatePropertyLi)}
        </ul>
    )
}

export default Home;