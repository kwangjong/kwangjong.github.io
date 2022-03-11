import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import logo from './logo.svg';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Tic-Tac-Toe
          </h1>
        </header>
        <body className="App-body">
          <Game />
        </body>
      </div>
    );
 }
}

export default App;



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
