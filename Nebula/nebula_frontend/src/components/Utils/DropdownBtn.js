import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const DropdownBtn = () => {

    let [menuState, setMenuState] = useState(false)

    function toggleMenuState() {
        setMenuState(!menuState)
    }
  
    return (
        <div className="n-card-header-btn">
            <div className="more show-more-menu">
                <button id="more-btn" className="more-btn" onClick={toggleMenuState}>
                    <span className="more-dot"></span>
                    <span className="more-dot"></span>
                    <span className="more-dot"></span>
                </button>
                {menuState && <DropdownMenu /> }
            </div>
        </div>
  );
}

export default DropdownBtn;