import React from "react";

function Highlight(props){
    return <div className="highlight">
        <img className="icon" 
             src={props.icon} 
             alt="project quickview" 
             height="20%"/>
        <p className="highlight-number">123</p>
    </div>
}

export default Highlight;