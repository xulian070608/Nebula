import React, { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

const DropdownBtn = () => {

    let [menuState, setMenuState] = useState(false)

    // function toggleMenuState() {
    //     setMenuState(!menuState)
    // }

    function handleMenuOpen() {
        setMenuState(true)
        // console.log("setMenuState: true")
    }

    function handleMenuClose() {
        setMenuState(false)
        // console.log("setMenuState: false")
    }

    useEffect(() => {
            document.addEventListener("mousedown", handleMenuClose, true);
            // console.log("event listener added.")
        return () => {
            document.removeEventListener("mousedown", handleMenuClose, true)
            // console.log("event listener removed")
        }
    })
  
    return (
        <div className="n-card-header-btn">
            <div className="more show-more-menu">
                <button id="more-btn" className="more-btn" onClick={handleMenuOpen}>
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