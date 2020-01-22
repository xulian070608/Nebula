import React from 'react';

const DropdownMenu = () => {
    return (
        <div className="more-menu">
                <div className="more-menu-caret">
                    <div className="more-menu-caret-outer"></div>
                    <div className="more-menu-caret-inner"></div>
                </div>
                <ul className="more-menu-items" tabindex="-1" role="menu" aria-labelledby="more-btn" aria-hidden="true">
                    <li className="more-menu-item" role="presentation">
                        <button type="button" className="more-menu-btn" role="menuitem">Share</button>
                    </li>
                    <li className="more-menu-item" role="presentation">
                        <button type="button" className="more-menu-btn" role="menuitem">Copy</button>
                    </li>
                    <li className="more-menu-item" role="presentation">
                        <button type="button" className="more-menu-btn" role="menuitem">Embed</button>
                    </li>
                    <li className="more-menu-item" role="presentation">
                        <button type="button" className="more-menu-btn" role="menuitem">Block</button>
                    </li>
                    <li className="more-menu-item" role="presentation">
                        <button type="button" className="more-menu-btn" role="menuitem">Report</button>
                    </li>
                </ul>
            </div>
    )
}

export default DropdownMenu