import React from 'react';
import './Game.css';


function Square(props) {
  return (
    <label className="square" onClick={props.onClick}>
      {props.value}
    </label>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      active: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (!this.state.active || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares, xIsNext: !this.state.xIsNext, active: !this.state.active});
  }

  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
      );
  }

  render() {
    let winner = calculateWinner(this.state.squares); //check for winne

    let status;
    if (winner) {
      this.setState({active: false}); //deactivate click if there is a winner
      status = winner === 'X' ? 'You Won!' : 'Computer Won';
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

//implement ai using random
function ai(board) {
  const squares = board.state.squares.slice();

  let i = randomMove(squares)
  squares[i] = board.state.xIsNext ? 'X' : 'O';
  board.setState({squares: squares, xIsNext: !board.state.xIsNext, active: !board.state.active});
}

function randomMove(squares) {
  let i;
  do {
    i = Math.floor(Math.random() * squares.length)
  } while(squares[i])

  return i;
}

class Game extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}

export default Game;
