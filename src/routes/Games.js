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

    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/9P4U9HheFG4fo4DyYcisBZxnUR1bqhNIJqE_lHunyvfidzrvKKRtewqqvWYVQFWNGJSVMuJlNOEkIA/ids?startTime=1641513600&type=ranked&start=0&count=10&api_key=${process.env.REACT_APP_LOL_API_KEY}`
    const [games, setGames] = useState({
      loading: false,
      data: null, 
      error: false
    })
  

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
    
    let content = null

    if(games.error) {
      content = 
        <p>
          There was an error please refresh or try again later.
        </p>
    }

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
        {content}
      </div>
    )
    
  }

export default Games;