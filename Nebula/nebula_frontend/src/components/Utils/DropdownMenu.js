import React from 'react';

const DropdownMenu = () => {
    return (
        <div className="more-menu">
            {/* <div className="more-menu-caret">
                <div className="more-menu-caret-outer"></div>
                <div className="more-menu-caret-inner"></div>
            </div> */}
            <ul className="more-menu-items" tabIndex="-1" role="menu" aria-labelledby="more-btn" aria-hidden="true">
                <li className="more-menu-item" role="presentation">
                    <button type="button" className="more-menu-btn" role="menuitem">Edit</button>
                </li>
                <li className="more-menu-item" role="presentation">
                    <button type="button" className="more-menu-btn" role="menuitem">Export</button>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenu