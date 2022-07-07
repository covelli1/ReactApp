import React, { useEffect, useState } from "react";

let images = {}
    require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/).keys().map((item, index) => { images[item.replace('./', '')] = require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/)(item); });


function Both_Teams(props) {
    let team1 = null
    let team2 = null

    console.log(props.teamDict)
    let champ = null
    for(var x in props.teamDict) {
        console.log(x)
        if(team1 == null) {
            team1 = 
            props.teamDict[x].map((player) =>
                {
                    champ = player[1].championName + '.png'
                    console.log(champ)

                    return (
                        <div className="flex justify-center items-center">
                            <img src={images[champ]} className="object-scale-down h-48 w-96" />
                            {player[0]} 
                            <br></br>
                        </div>
                    )
                        
                }
                
                
            )
        } else {
            team2 = 
            props.teamDict[x].map((player) =>
                {
                    champ = player[1].championName + '.png'
                    console.log(champ)

                    return (
                        <div className="flex justify-center items-center">
                            <img src={images[champ]} className="object-scale-down h-48 w-96" />
                            {player[0]} 
                            <br></br>
                        </div>
                    )
                        
                }
                
                
            )
        }
    }


    return ( 
        
        
        <div className="flex justify-end items-center right-10 w-full ">
            <div className="flex flex-col pl-5">
                {team1}
            </div>
            
            <div className="flex flex-col pl-5">
                {team2}
            </div>
        </div>
    )
}

export default Both_Teams;