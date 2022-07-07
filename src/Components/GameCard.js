import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../Components/Loader'
import Both_Teams from './Both_Teams'


let user = "Covelli"

function GameCard(props) {
    
    let images = {}
    require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/).keys().map((item, index) => { images[item.replace('./', '')] = require.context('../ChampionImages', false, /\.(png|jpe?g|svg)$/)(item); });


    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${props.game}?api_key=${process.env.REACT_APP_LOL_API_KEY}`
    const [GameCard, setGameCard] = useState({
      loading: false,
      data: null, 
      error: false
    })
  

    useEffect(() =>     
    {
        setGameCard({
            loading:true,
            data:null,
            error:false
        })

        axios.get(url)
            .then(response => {
            setGameCard({
                loading: false,
                data: response.data,
                error:false
            })
        })
        .catch(() => {
            setGameCard({
                loading: false,
                data:null,
                error:true
            })
        })
    }, [url])
    
    let content = null

    if(GameCard.error) {
      content = 
        <p>
          There was an error please refresh or try again later.
        </p>
    }

    if(GameCard.loading) {
      content = 
        <Loader></Loader>
    }

    var summonerInfoDict = {}
    var summonerTeamDict = {}
    var gameWin = false
    if(GameCard.data) {
        JSON.stringify(GameCard.data)

        var gameDateEpoch = new Date(GameCard.data.info.gameCreation);
        var gameDate = gameDateEpoch.toDateString()
        
        //SET VALUES IN summonerInfoDict: key=summonerName value=game data associated with the summoner
        GameCard.data.info.participants.map(
            (gameCard, key) =>         
            summonerInfoDict[gameCard.summonerName] = gameCard,
            
        )

        //SET VALUES IN summonerTeamDict: key=teamId value=list of summoners
        GameCard.data.info.participants.map(
            (gameCard, key) => {
                if(!(gameCard.teamId in summonerTeamDict)) {
                    summonerTeamDict[gameCard.teamId] = []
                    summonerTeamDict[gameCard.teamId].push([gameCard.summonerName, gameCard])
                   
                } else {
                    summonerTeamDict[gameCard.teamId].push([gameCard.summonerName, gameCard])
                }
            }
        )
        

        

        for(var key in summonerInfoDict) {
            if(key == user) {
                
                // Get the Champion played so we can grab the image
                let champion = summonerInfoDict[key].championName
                champion += '.png'

                if(summonerInfoDict[key].win == true){
                    gameWin = true
                }
                
                try{
                    if(!gameWin) {
                        content = 
                        // PARENT DIV THAT SETS BACKGROUND COLOR
                        <div className="bg-gradient-to-r from-red-600 to-red-300 flex justify-start">
                            
                            {/* DISPLAY: DATE/CHAMPION PLAYED/KDA */}
                            <div className="pl-10 py-4">
                                {gameDate}
                                <img src={images[champion]} />
                                {summonerInfoDict[key].kills} / {summonerInfoDict[key].deaths} / {summonerInfoDict[key].assists}
                            </div>

                            {/* DISPLAY THE WIN STATUS */}
                            <div className="pl-10 py-4 flex justify-center items-center">
                                GAME LOST
                            </div>

                            {/* DISPLAY WHICH PLAYER WAS ON WHICH TEAM */}
                            
                            <Both_Teams teamDict={summonerTeamDict} />

                        </div>
                    } else {
                        content = 
                        // PARENT DIV THAT SETS BACKGROUND COLOR
                        <div className="bg-gradient-to-r from-green-500 to-green-200 flex justify-start">
                            
                            {/* DISPLAY: DATE/CHAMPION PLAYED/KDA */}
                            <div className="pl-10 py-4 flex-col">
                                {gameDate}
                                <img src={images[champion]} />
                                {summonerInfoDict[key].kills} / {summonerInfoDict[key].deaths} / {summonerInfoDict[key].assists}
                            </div>

                            {/* DISPLAY THE WIN STATUS */}
                            <div className="pl-10 py-4 flex justify-center items-center">
                                GAME WIN
                            </div>

                            {/* DISPLAY WHICH PLAYER WAS ON WHICH TEAM */}
                            
                            <Both_Teams teamDict={summonerTeamDict} />
                            
                        </div>
                    }
                    
                    
                } catch(error) {

                }
            }
        }
        
    }



    return (
        <div>
            {content}
        </div>
    )
}

export default GameCard