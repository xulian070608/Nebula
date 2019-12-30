import React from "react";

function PropertySelectorOption(props) {

    return (
    <option value={props.value} >
        {props.name}
    </option>
    )
}

export default PropertySelectorOption