import React from 'react';
import { Link } from 'react-router-dom';

function PropertyLi (props) {

    return (
        <Link to={`/${props.propertyID}/summary`}>
            <li>{props.propertyName}</li>
        </Link>     
    )
}

export default PropertyLi;