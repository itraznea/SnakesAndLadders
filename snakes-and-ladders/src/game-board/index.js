import React from "react";
import PropTypes from "prop-types";

export default class GameBoard extends React.Component {
    render(){
        const girlPlayerStyle = {
            position: "absolute",
            top: this.props.player1Position.top,
            left: this.props.player1Position.left
        }

        const boyPlayerStyle = {
            position: "absolute",
            top: this.props.player2Position.top,
            left: this.props.player2Position.left
        }

        return (
            <div className="App-game-container">
                <div className="App-board-container">
            </div>

            <div style={girlPlayerStyle}>
                <img src="./girl_resized.png" alt="Girl"/>
            </div>

            <div style={boyPlayerStyle}>
                <img src="./boy_resized.png" alt="Boy"/>
            </div>

            </div>
        )
    }
}

GameBoard.propTypes = {
    player1Position: PropTypes.object,
    player2Position: PropTypes.object
}