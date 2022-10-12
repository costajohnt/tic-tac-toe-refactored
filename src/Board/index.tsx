import * as React from "react";
import Square from "../Square";
import { SquareValue } from "../Types";
import { calculateWinner } from "../Winner";

interface BoardProps {}

type Player = 'X' | 'O'

interface State {
  squares: SquareValue[];
  player: Player;
}

const setPlayer = (player: Player): Player => player === 'X' ? 'O' : 'X'

const playerMessage = (winner: SquareValue, player: Player) => {
  switch (winner) {
    case '':
      return "Next player: " + (player);
    case 'O':
    case 'X':
      return "Winner: " + winner;
  }
}

const startingBoard: SquareValue[] = Array(9).fill("")

class Board extends React.Component<BoardProps, State> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: startingBoard,
      player: 'X',
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.player
    this.setState({ squares: squares, player: setPlayer(this.state.player)});
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = playerMessage(winner, this.state.player)

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

export default Board;
