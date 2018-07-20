import React from 'react';
import './App.css';
import RollDices from "./roll-dices/roll-dices"
import GameBoard from "./game-board/"

const squareWidth = 56.4;
const squareHeight = 56;
const imgHeight = squareHeight * 10 - 51;
const swingArray = [1, -1];

class App extends React.Component {
  
    constructor(){
      super();
      this.state = {
        roll1: null,
        roll2: null,
        isPlayer1Turn: true,
        player1Value: -1,
        history: [],
        clicks: -1,
        player2Value: -1,
        player1Position: {
          top: "509px",
          left: "15px"
        },
        player2Position: {
          top: "509px",
          left: "0px"
        },
        gameStatus: true
      };
      
      this.handlers = {};
    }
   getPositionFromValue(value){
      const row = Math.floor(value / 10);
      const column = value % 10;
      const top = imgHeight - row * squareHeight;
      let left = (( row + 1) % 2 * 56) + ((10 + swingArray[row % 2] * column ) % 10) * squareWidth;
      if(value % 10 === 0 ){
        left = row  % 2 ? 10 * squareWidth : 56;
      }
        
      return {
        top: top + "px",
        left: left + "px"
      }
    }

    getRealValue(value){
      const board = {
        //Ladder
        1: 37,
        6: 13,
        7: 30,
        14: 25,
        27: 83,
        20: 41,
        35: 43,
        50: 66,
        70: 90,
        77: 97,
        86: 93,
        //Snakes
        15: 5,
        45: 24,
        48: 10,
        61: 18,
        63: 59,
        73: 52,
        88: 67,
        91: 87,
        94: 74,
        98: 79
      }
      return board[value] || value;
    }

    getGameStatus(value){
      return value !== 99;
    }

    get rollDices () {
      return this.handlers.rollDices || (
        this.handlers.rollDices = (dice1, dice2) => {
          const nextState = Object.assign({}, this.state, {
            roll1: dice1,
            roll2: dice2
          });
          nextState.clicks++
          if (this.state.isPlayer1Turn) { // player-ul curent
            nextState.player1Value = nextState.player1Value + dice1 + dice2;
            nextState.history.push({
              player: "player1",
              dice1,
              dice2,
              playerOldValue: this.state.player1Value,
              playerTempValue: nextState.player1Value,
              playerNextValue: this.getRealValue(nextState.player1Value) <= 99 ? this.getRealValue(nextState.player1Value) : 99 - (this.getRealValue(nextState.player1Value) - 99),
              updatedValue: null
            });
            nextState.player1Value = this.getRealValue(nextState.player1Value) <= 99 ? this.getRealValue(nextState.player1Value) : 99 - (this.getRealValue(nextState.player1Value) - 99);
            nextState.player1Value = this.getRealValue(nextState.player1Value);
            nextState.history[nextState.history.length -1].updatedValue = this.getRealValue(nextState.player1Value);
            nextState.player1Position = this.getPositionFromValue(nextState.player1Value);
            nextState.gameStatus = this.getGameStatus(nextState.player1Value);
          }else{
            nextState.player2Value = nextState.player2Value + dice1 + dice2;
            nextState.history.push({
              player: "player2",
              dice1,
              dice2,
              playerOldValue: this.state.player2Value,
              playerTempValue: nextState.player2Value,
              playerNextValue: this.getRealValue(nextState.player2Value) <= 99 ? this.getRealValue(nextState.player2Value) : 99 - (this.getRealValue(nextState.player2Value) - 99),
              updatedValue: null
            });
            nextState.player2Value = this.getRealValue(nextState.player2Value) <= 99 ? this.getRealValue(nextState.player2Value) : 99 - (this.getRealValue(nextState.player2Value) - 99);
            nextState.player2Value = this.getRealValue(nextState.player2Value);
            nextState.history[nextState.history.length -1].updatedValue = this.getRealValue(nextState.player2Value);
            nextState.player2Position = this.getPositionFromValue(nextState.player2Value);
            nextState.gameStatus = this.getGameStatus(nextState.player2Value);
          }

          nextState.isPlayer1Turn = (dice1 === dice2) ? nextState.isPlayer1Turn : !nextState.isPlayer1Turn;
          this.setState(nextState);
        }
      )
    }

    render() {

      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Snakes and Ladders Game in React</h1>
          </header>
          <div> Player1 Value: {this.state.player1Value + 1 }</div>
          <div> Player2 Value: {this.state.player2Value + 1 }</div>
          <RollDices
            rollDicesHandler={this.rollDices}
            dice1Value={this.state.roll1}
            dice2Value={this.state.roll2}
            whoIsNext={this.state.isPlayer1Turn}
            gameStatus={this.state.gameStatus}
            player={this.state.history[this.state.history.length -1] ? this.state.history[this.state.history.length -1].player : "Player1"}
          />
          {/* {
            this.state.gameStatus ?
            <RollDices
            rollDicesHandler={this.rollDices}
            dice1Value={this.state.roll1}
            dice2Value={this.state.roll2}
            whoIsNext={this.state.isPlayer1Turn}
          />
          :
          <div>
            {this.state.history[this.state.history.length -1].player} Won!
          </div>
          } */}
          <GameBoard
            player1Position={this.state.player1Position}
            player2Position={this.state.player2Position}
          />
          <div className="history">
          <h1>History</h1>
          {/* {this.state.currentString} */}
          <ul >
          {this.state.history.map((historyItem, key) => {
            return (
              <li key={key}> The Player: "{historyItem.player}" rolled: {historyItem.dice1} and {historyItem.dice2}, 
              and moved from {historyItem.playerOldValue+1} to {
              historyItem.playerTempValue === historyItem.playerNextValue ?
              historyItem.playerNextValue+1 :
              (historyItem.playerTempValue+1) + " then move again to " + (historyItem.playerNextValue+1) + ". You are now on " + (historyItem.updatedValue+1)
              }
              </li>
            )
          })}
          </ul>
          </div>
        </div>
    );
  }
}

export default App;
