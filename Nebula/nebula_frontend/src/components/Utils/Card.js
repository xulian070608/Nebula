import React from "react";

function Card(){
    return <div className="n-card">
        <div className="n-card-header">
            <h5 className="n-card-header-title">Name</h5>
            <button className="n-card-header-btn">...</button>
        </div>
        <hr className="n-card-hr"/>
        <div className="n-card-body">
            <p>this is a card placeholder</p>
        </div>
</div>
}

export default Card;