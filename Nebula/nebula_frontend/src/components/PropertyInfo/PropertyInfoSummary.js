import React from "react";

function PropertyInfoSummary(props) {
    return (
     <div>
         <h2>{props.buildingName}</h2>
         <p>{props.buildingAddress}</p>
         {/* <p>{props.buildingTerritory}</p> */}
         <p>UUID: {props.buildingUUID}</p>
         <p>{props.buildingUSF} USF</p>
         <p>{props.buildingDeskCount} Desks</p>
         {/* <p>{props.buildingRoomCount}</p> */}
     </div>
    );
}

export default PropertyInfoSummary;