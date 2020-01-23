import React from "react";
import DropdownBtn from "./DropdownBtn";

function Card(props){
    return <div className="n-card">
        <div className="n-card-header">
            <h4 className="n-card-header-title">{props.title}</h4>
            <DropdownBtn />
        </div>
        <hr className="n-card-hr"/>
        <div className="n-card-body overflow-auto">
            <p>this is a card placeholder</p>
        </div>
</div>
}


Card.defaultProps = {
    title: 'Name',
  };

export default Card;