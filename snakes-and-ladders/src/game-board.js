import React from "react";
import PropTypes from "prop-types";


export default class GameBoard extends React.Component {
    get renderedSquares(){
        const returnArray = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++){
                returnArray.push(<rect 
                    x={i * this.props.squareSize}
                    y={j * this.props.squareSize}
                    width={this.props.squareSize}
                    height={this.props.squareSize}
                    key={i*10+j}
                    style={{
                        fill: this.props.colors[(i*10 + j) % this.props.colors.length]
                    }} />)
            }
        }
        return returnArray;
    }

    render() {
        return (
            <svg width="600" height="600">
                {this.renderedSquares}
            </svg>
        )
    }
}

GameBoard.protoTypes = {
    squareSize: PropTypes.number.required,
    colors: PropTypes.arrayOf(PropTypes.string)
};
GameBoard.defaultProps = {
    squareSize: 60,
    colors: ["#FFB6C1", "#DDA0DD", "#9370DB", "#87CEFA", "#FF7F50", "#F0E68C", "#9ACD32", "#7FFFD4"]
}