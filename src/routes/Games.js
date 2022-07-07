import React, { useEffect, useState } from "react";
import HelloWorld from "../Components/HelloWorld";
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
    const [games, setGames] = useState({
      loading: false,
      data: null, 
      error: false
    })

    //Changes the "numGamesLoad" so the page can render correct number of games
    const handleSubmit = event => {
      console.log(event.target.value)
      setNumGamesLoad(event.target.value);
    }


    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/9P4U9HheFG4fo4DyYcisBZxnUR1bqhNIJqE_lHunyvfidzrvKKRtewqqvWYVQFWNGJSVMuJlNOEkIA/ids?startTime=1641513600&type=ranked&start=0&count=${numGamesLoad}&api_key=${process.env.REACT_APP_LOL_API_KEY}`
    
    //Use effect tells component to "do something" after render
    //After render: setGames runs and axios gets url response
    useEffect(() => {
      setGames({
        loading:true,
        data:null,
        error:false
      })

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
      })
    }, [url])
    
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
          <GameCard game={game}/>
        </div>
      )
    }

    return (
      <div >
        <form onSubmit={handleSubmit}>
          <label for="num">Input the number of games to view:</label>
          <input
            type="text"
            id="num"
            name="num"
          />
          <input type="submit" value="Submit" />
        </form>
        {content}
      </div>
    )
    
  }

export default Games;