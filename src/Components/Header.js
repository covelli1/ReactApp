import React from "react";
import Navigation from "./Navigation";

function Header() {
    return(
        <header className="border-b p-3 flex justify-between items-center bg-blue-500 shadow-md">
            <div className="flex flex-row items-center space-x-4">
                <div>
                    <img src="./LOL_logo.png" width={50} height={50}></img>

                </div>
                <div>
                    <span className="font-bold">League of Legends Tracker</span>

                </div>

            </div>
            
            <Navigation/>
        </header>
    )
}

export default Header;