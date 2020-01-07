import React from "react";

function TableRow01(props) {
    return (
        <tr>
            <th>{props.floorName}</th>
            <th>{props.floorUSF}</th>
            <th>{props.openDate}</th>
        </tr>
    )
}

export default TableRow01;