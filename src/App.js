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



function App() {
  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
                  Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Changes are made
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
      <Router>
        <Header/>
        
        <div className='p-3'>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
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
