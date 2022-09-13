// import logo from './logo.svg';

// import HelloWorld from './Components/HelloWorld';
// import CounterExample from './Components/CounterExample';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from "./routes/About"
import Home from './routes/Home';
import Games from './routes/Games';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";

import { useEffect, useState } from 'react';


function App() {
  

  return (
    <div>
      
      <Router>
        <Header/>
        
        <div className='p-3 '>
          <Routes>
            
            {/* MAKE SURE BOTH ROUTE TO HOME PAGE */}
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/ReactApp" element={<Home />}></Route>
            
            <Route path="/about" element={<About />}/>
            <Route path="/games" element={<Games />}/>
            
          </Routes>
        </div>
        
        

        <Footer/>
      </Router>
      
      
    </div>
  );
}

export default App;
