import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        style={squareStyle}
        onClick={() => {
          if (!this.props.value) {
            this.props.handleClick()
          }
        }}
      >
        {this.props.value || ''}
      </div>
    );
  }
}

const winComb = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [1, 4, 7],
  5: [2, 5, 8],
  6: [3, 6, 9],
  7: [1, 5, 9],
  8: [3, 5, 7],
};
const checkWinner = (score, currentPlayer) => {
  let winner = '';
  if (Object.keys(score).length < 5 ) return;
  const pastPlayer = currentPlayer === 'X' ? 'O' : 'X';
  for (let val in winComb) {
    if (winComb[val].every((comb) => score[comb] === pastPlayer)) {
      winner = pastPlayer;
    };
  }
  return winner;
};

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [score, setScore] = useState({});
  const [winner, setWinner] = useState('');
  const handleClick = (position) => {
    if (winner) return;
    setScore(s => ({
      ...s,
      [position]: currentPlayer,
    }));
    setCurrentPlayer(c => c === 'X' ? 'O' : 'X');
  }
  const handleReset = () => {
    setScore({});
    setCurrentPlayer('X');
  }

  useEffect(() => {
    setWinner(checkWinner(score, currentPlayer));
  }, [score, currentPlayer, setWinner]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div
        className="status"
        style={instructionsStyle}
      >
        Next player: {currentPlayer === 'X' ? 'O' : 'X'}
      </div>
      {
        winner && (
          <div
            className="winner"
            style={instructionsStyle}
          >
            Winner: {winner}
          </div>
        )
      }
      <button
        style={buttonStyle}
        onClick={handleReset}
      >
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square
            handleClick={() => handleClick(1)}
            value={score['1']}
          />
          <Square
            handleClick={() => handleClick(2)}
            value={score['2']}
          />
          <Square
            handleClick={() => handleClick(3)}
            value={score['3']}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            handleClick={() => handleClick(4)}
            value={score['4']}
          />
          <Square
            handleClick={() => handleClick(5)}
            value={score['5']}
          />
          <Square
            handleClick={() => handleClick(6)}
            value={score['6']}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            handleClick={() => handleClick(7)}
            value={score['7']}
          />
          <Square
            handleClick={() => handleClick(8)}
            value={score['8']}
          />
          <Square
            handleClick={() => handleClick(9)}
            value={score['9']}
          />
        </div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
