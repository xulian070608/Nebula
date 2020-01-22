import React from "react";
import DropdownBtn from "./DropdownBtn";

function Card(){
    return <div className="n-card">
        <div className="n-card-header">
            <h4 className="n-card-header-title">Name</h4>
            <DropdownBtn />
        </div>
        {/* <hr className="n-card-hr"/> */}
        <div className="n-card-body">
            <p>this is a card placeholder</p>
        </div>
</div>
}

export default Card;