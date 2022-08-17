import React, { useEffect, useRef, useState } from "react";
import HelloWorld from "../Components/HelloWorld";
import axios from "axios";
import Loader from '../Components/Loader'
import GameCard from "../Components/GameCard";

function Home() {

  const [summonerSearch, setSummonerSearch] = useState("");
  const [summonerPUUID, setSummonerPUUID] = useState("");
  const [games, setGames] = useState({
    loading: false,
    data: null, 
    error: false
  });

  let summonerSearchUrl = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerSearch}?api_key=${process.env.REACT_APP_LOL_API_KEY}`
  let gamesUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPUUID}/ids?startTime=1641513600&type=ranked&start=0&count=10&api_key=${process.env.REACT_APP_LOL_API_KEY}`
  

  const updateSummonerPUUID = () => {
    console.log(summonerSearch)
    console.log(summonerSearchUrl)
    axios.get(summonerSearchUrl)
    .then(response => {
      setSummonerPUUID(response.data.puuid)
    })
  }

  const getGames = () => {
    if(summonerPUUID !== "") {
      console.log(gamesUrl)
      setGames({
        loading:true,
        data:null,
        error:false
      })
  
      axios.get(gamesUrl)
      .then(response => {
        setGames({
          loading: false,
          data: response.data,
          error:false
        })
      })
      .catch(() => {
        setGames({
          loading: false,
          data:null,
          error:true
        })
      });
    }
  }

  useEffect(() => getGames(), [summonerPUUID]);

  let content = null
  if(summonerPUUID !== "") {
    

    //If there was an error with axios respsonse, display error message
    if(games.error) {
      content = 
        <p>
          There was an error please refresh or try again later.
        </p>
    }

    //Displays loading image until axious either gets or catches
    if(games.loading) {
      content = 
        <Loader></Loader>
    }

    if(games.data) {
      content = 
      games.data.map((game) =>
        <div className="block border-t border-b" key={game.toString()}>
          <GameCard game={game} player={summonerSearch}/>
        </div>
      )
    }
  }

  return ( 
    <div>
      <div className="flex">
        <div>
  
  
          <label className="pr-2 text-xl font-semibold">
            Input the Summoner to view:
          </label>
          <input
              id="summonerName"
              name="summonerName"
              value={summonerSearch}
              onChange={e => 
                {
                  setSummonerSearch(e.target.value);
                }
              }
              onKeyPress={(e) => {
                if(e.key === "Enter") { 
                  updateSummonerPUUID();
                }}
            }
              className="border border-solid border-black p-2 rounded"
            />
        </div>
  
        <div className="pl-3">
          <button 
            onClick={updateSummonerPUUID}
            className="border border-black p-2 rounded"
          >
            Submit
          </button>
        </div>
          
        
      </div>
      <div>
        {content}
      </div>
    </div>
  )
  
}

export default Home