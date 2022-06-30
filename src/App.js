import logo from './logo.svg';

import HelloWorld from './Components/HelloWorld';
import CounterExample from './Components/CounterExample';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
      <Header/>
      <HelloWorld name="Anthony" temp="Vin"/>
      <CounterExample />
      <Footer/>
    </div>
  );
}

export default App;
