import React from "react";
import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link,
  } from "react-router-dom";

function NavigationMenu(props) {
    return (
        <div className="p-3">
            <div className="font-bold">The menu</div>
            <ul>
                <li>
                    <Link to="/" className='text-blue-500 py-3 border-t border-b block' onClick={props.closeMenu}>HOME</Link>
                </li>
                <li>
                    <Link to="/about" className='text-blue-500 py-3 border-b block' onClick={props.closeMenu}>ABOUT</Link>
                </li>
                <li>
                    <Link to="/games" className='text-blue-500 py-3 border-b block' onClick={props.closeMenu}>Games</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationMenu