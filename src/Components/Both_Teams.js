import { Container } from "postcss";
import React, { useEffect, useState } from "react";

let images = {}
    require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/).keys().map((item, index) => { images[item.replace('./', '')] = require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/)(item); });


function Both_Teams(props) {
    let team1 = null
    let team2 = null

    let champ = null
    for(var x in props.teamDict) {
        if(team1 == null) {
            team1 = 
            props.teamDict[x].map((player) =>
                {
                    champ = player[1].championName.charAt(0).toUpperCase() + player[1].championName.slice(1).toLowerCase() + '.png'
                    console.log(champ)

                    return (
                        <div className="" key={player[0]}>
                            <div className="flex flex-row items-center">
                                
                                <img src={images[champ]} className="scale-50" />
                                {player[0]} 
                                
                            </div>
                            
                        </div>

                        
                    )
                        
                }
                
                
            )
        } else {
            team2 = 
            props.teamDict[x].map((player) =>
                {
                    champ = player[1].championName.charAt(0).toUpperCase() + player[1].championName.slice(1).toLowerCase() + '.png'
                    console.log(champ)
                    return (
                        <div className="" key={player[0]}>
                            <div className="flex flex-row items-center">
                                
                                <img src={images[champ]} className="scale-50" />
                                {player[0]} 
                            
                            </div>
                            
                        </div>
                    )
                        
                }
                
                
            )
        }
    }


    return ( 
        
        
        <div className="flex justify-end items-center w-full">
            <div className="flex flex-col">
                {team1}
            </div>
            
            <div className="flex flex-col">
                {team2}
            </div>
        </div>
    )
}

export default Both_Teams;