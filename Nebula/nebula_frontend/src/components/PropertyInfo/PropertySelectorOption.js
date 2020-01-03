import React from "react";
import { DropdownItem } from 'reactstrap';

function PropertySelectorOption(props) {

    return (
    <option value={props.value} >
        {props.name}
    </option>
    )
}

export default PropertySelectorOption