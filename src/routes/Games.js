import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from '../Components/Loader'
import GameCard from "../Components/GameCard";

import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  Link,
} from "react-router-dom";
import { data } from "browserslist";


function Games() {
    
    //Hook Declaration
    const [numGamesLoad, setNumGamesLoad] = useState(10);
    let covelli = "";
    const [games, setGames] = useState({
      loading: false,
      data: null, 
      error: false
    });

    const covelliURL = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/covelli?api_key=${process.env.REACT_APP_LOL_API_KEY}`

      
  
    //Create function "urlFormat"
    

    //Changes the "numGamesLoad" so the page can render correct number of games
    const fetchData = () => {

      axios.get(covelliURL)
      .then(response => {
        covelli = (response.data.puuid)
        const urlFormat = num => `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${covelli}/ids?startTime=1641513600&type=ranked&start=0&count=${num}&api_key=${process.env.REACT_APP_LOL_API_KEY}`
        const url = urlFormat(numGamesLoad);
        
      setGames({
        loading:true,
        data:null,
        error:false
      });

      axios.get(url)
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
      });

      
  };

  useEffect(() => {
    
    fetchData()
  }, []);


    //initialize var that will hold html content to display
    let content = null

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
          <GameCard game={game} player="covelli"/>
        </div>
      )
    }


    /**
     * using <form> was fucking you up
     * i updated your structure a bit to make it a lot better, but it's not the best structure
     * calling useEffect with [] empty dependency array means it loads only ONCE, the very very beginning load
     */


    return (
      <div >
        <div>
          <label>
            Input the number of games to view:
            <input
              id="num"
              name="num"
              value={numGamesLoad}
              onChange={e => {
                setNumGamesLoad(e.target.value);
              }
            }
            />
          </label>
          <button onClick={fetchData}>Submit</button>
        </div>
        {content}
      </div>
    )
    
  }

export default Games;