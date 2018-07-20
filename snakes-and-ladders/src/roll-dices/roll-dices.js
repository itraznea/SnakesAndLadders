import React from "react";
import PropTypes from "prop-types";
import dice0 from "../dices-svg/dice0.svg";
import dice1 from "../dices-svg/dice1.svg";
import dice2 from "../dices-svg/dice2.svg";
import dice3 from "../dices-svg/dice3.svg";
import dice4 from "../dices-svg/dice4.svg";
import dice5 from "../dices-svg/dice5.svg";
import dice6 from "../dices-svg/dice6.svg";

export default class RollDices extends React.Component {
    constructor(props){
        super(props);
        this.handlers = {};
    }

    get rollButtonHandler() {
        return this.handlers.rollButtonHandler || (
            this.handlers.rollButtonHandler = (event) => {
                event.stopPropagation();
                this.props.rollDicesHandler(this.getRandomInt(1,7), this.getRandomInt(1,7));
            }
        )
    }
    getDiceImg(diceValue){
        switch(diceValue){
            case 6:
                return <img src={dice6} alt={diceValue} />;
            case 5:
                return <img src={dice5} alt={diceValue} />;
            case 4:
                return <img src={dice4} alt={diceValue} />;
            case 3:
                return <img src={dice3} alt={diceValue} />;
            case 2:
                return <img src={dice2} alt={diceValue} />;
            case 1:
                return <img src={dice1} alt={diceValue} />;
            default: 
                return <img src={dice0} alt="0" />;
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    render() {
        return (
            <React.Fragment>
                { this.props.gameStatus ?
            <div className="App-player-actions">
                {
                    this.props.whoIsNext ? "Player1's turn" : "Player2's turn"
                }
                <button className="roll-button" onClick={this.rollButtonHandler}>Roll</button>
            </div>
            :
            <div>
                {this.props.player} won! Congratulations!
             </div>
            }
  
            <div className="rolled-dices">
                {this.getDiceImg(this.props.dice1Value)}
                {this.getDiceImg(this.props.dice2Value)}
            </div>
          </React.Fragment>
        )
    }
}

RollDices.propTypes = {
    rollDicesHandler: PropTypes.func,
    dice1Value: PropTypes.number,
    dice2Value: PropTypes.number,
    whoIsNext: PropTypes.bool,
    gameStatus: PropTypes.bool,
    player: PropTypes.string
}