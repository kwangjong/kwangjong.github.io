import React from 'react';
import './Game.css';

const PLAYER = 'X'
const AI = 'O'

function Square(props) {
  return (
    <label className="square" onClick={props.onClick}>
      {props.value}
    </label>
  );
}
/**
 * 'X' wins: -1
 * 'O' wins: 1
 *  tie : 0
 * @param  {[type]} squares [description]
 * @return {[type]}         [description]
 */
function calculateWinner(squares) {
  //all possible wins
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === 'X' ? -1 : 1;
    }
  }

  //check for tie
  let availableSpot = 0;
  for(let i=0; i < squares.length; i++) {
    if(!squares[i])
      availableSpot++;
  }
  return availableSpot === 0 ? 0 : null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      active: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (!this.state.active || squares[i]) {
      return;
    }
    squares[i] = PLAYER;
    this.setState({squares: squares, active: !this.state.active});
  }

  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
      );
  }

  render() {
    let winner = calculateWinner(this.state.squares); //check for winner

    let status;
    if (winner === -1 || winner === 1) {
      if (this.state.active) {
        this.setState({active: false}); //deactivate click if there is a winner
      }
      
      status = winner === -1 ? 'You Won!' : 'Computer Won!';
    } else if (winner === 0) {
      status = "Tie";
    } else {
      status = this.state.active ? 'Your turn' : 'Computer\'s turn';
      if(!this.state.active) {
        ai(this);
      }
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//implement ai using minimax
function ai(board) {
  const squares = board.state.squares.slice();
  let i = minimax(squares, 0, true)[1];
  squares[i] = AI;
  board.setState({squares: squares, active: !board.state.active});
}

//returns bestScore and index of the move as an array
function minimax(squares, depth, isMaxizing) {
  let result = calculateWinner(squares);
  if(result !== null) {
    return [result, null];
  }

  if(isMaxizing) {
    let maxI;
    let maxScore = -Infinity;
    for (let i=0; i<squares.length; i++) {
      if (!squares[i]) {
        squares[i] = AI;
        let score = minimax(squares, depth+1, false)[0];
        squares[i] = null;

        if (score > maxScore) {
          maxScore = score;
          maxI = i;
        }
      }
    }
    return [maxScore, maxI];
  } else {
    let minI;
    let minScore = Infinity;
    for (let i=0; i<squares.length; i++) {
      if (!squares[i]) {
        squares[i] = PLAYER
        let score = minimax(squares, depth+1, true)[0];
        squares[i] = null;

        if (score < minScore) {
          minScore = score;
          minI = i;
        }
      }
    }
    return [minScore, minI];
  }
}

class Game extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}

export default Game;
