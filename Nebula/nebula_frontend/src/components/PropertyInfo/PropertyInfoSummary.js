import React from "react";

function PropertyInfoSummary(props) {
    return (
     <div>
         <h2>{props.buildingName}</h2>
         <p>{props.buildingAddress}</p>
         <p>{props.buildingTerritory}</p>
         <p>{props.buildingUUID}</p>
         <p>{props.buildingUSF}</p>
         <p>{props.buildingDeskCount}</p>
         <p>{props.buildingRoomCount}</p>
     </div>
    );
}

export default PropertyInfoSummary;