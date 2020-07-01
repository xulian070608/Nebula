import React from 'react';

function FloorSelectorOption (props) {
    return (
        <option value={props.value} >
            {props.name}
        </option>
    )
}

export default FloorSelectorOption;