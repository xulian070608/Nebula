import React from 'react';
import { NavLink } from 'react-router-dom';

function PropertyLi (props) {

    return (
        <div>
            <NavLink to={`/${props.propertyID}/summary`} activeStyle={{textDecoration: "none"}}>
                <a>{props.propertyName}</a>
            </NavLink> 
        </div>    
    )
}

export default PropertyLi;