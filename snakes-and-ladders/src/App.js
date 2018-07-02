import React from 'react';
import './App.css';
import GameBoard from "./game-board";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Snakes and Ladders Game in React</h1>
        </header>
        <div className="board-container">
          <GameBoard />
        </div>
      </div>
    );
  }
}

export default App;
