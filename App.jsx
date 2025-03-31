import React, { useState, useEffect, useRef } from 'react';
import './TicTacToe.css'; // Import CSS file for styling

function TicTacToe() {
  const [boardSize, setBoardSize] = useState(3);
  const [difficulty, setDifficulty] = useState('Medium');
  const [board, setBoard] = useState(Array(boardSize).fill(null).map(() => Array(boardSize).fill(' ')));
  const [playerMarker, setPlayerMarker] = useState('X');
  const [computerMarker, setComputerMarker] = useState('O');
  const [turn, setTurn] = useState('Player');
  const [gameOn, setGameOn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showSettings, setShowSettings] = useState(true);
  const [theme, setTheme] = useState('light');

  const clickSound = useRef(null);
  const winSound = useRef(null);

  useEffect(() => {
    clickSound.current = new Audio('/click.wav');
    winSound.current = new Audio('/win.wav');
  }, []);

  const words = {
    // ... (Your words object)
  };

  const getRandomQuestion = () => {
    const keys = Object.keys(words);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { question: randomKey, answer: words[randomKey].answer };
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] === ' ' && gameOn && turn === 'Player') {
      const { question, answer } = getRandomQuestion();
      setQuizQuestion(question);
      setQuizAnswer(answer);
    }
  };

  const handleAnswerSubmit = (playerAnswer, row, col) => {
    if (playerAnswer.toLowerCase() === quizAnswer.toLowerCase()) {
      const newBoard = board.map((r, i) => r.map((c, j) => (i === row && j === col ? playerMarker : c)));
      setBoard(newBoard);

      if (winCheck(newBoard, playerMarker)) {
        setWinner('Player');
        setGameOn(false);
      } else if (isBoardFull(newBoard)) {
        setWinner('Tie');
        setGameOn(false);
      } else {
        setTurn('Computer');
        setTimeout(computerMove, 500);
      }
    } else {
      alert('Incorrect answer! You lose your turn.');
      setTurn('Computer');
      setTimeout(computerMove, 500);
    }
    setQuizQuestion(null);
    setQuizAnswer('');
  };

  const computerMove = () => {
    // ... (Your computerMove function)
  };

  const computer_choice = (board, computerMarker, playerMarker, difficulty) => {
    // ... (Your computer_choice function)
  };

  const winCheck = (board, marker) => {
    // ... (Your winCheck function)
  };

  const isBoardFull = (board) => {
    // ... (Your isBoardFull function)
  };

  const handleMarkerChange = (marker) => {
    setPlayerMarker(marker);
    setComputerMarker(marker === 'X' ? 'O' : 'X');
  };

  const handleBoardSizeChange = (size) => {
    setBoardSize(size);
  };

  const handleStartGame = () => {
    setBoard(Array(boardSize).fill(null).map(() => Array(boardSize).fill(' ')));
    setTurn(chooseFirst());
    setGameOn(true);
    setWinner(null);
    setShowSettings(false);
  };

  const chooseFirst = () => {
    return Math.random() < 0.5 ? 'Player' : 'Computer';
  };

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.play();
    }
  };

  const playWinSound = () => {
    if (winSound.current) {
      winSound.current.play();
    }
  };

  useEffect(() => {
    if (winner) {
      playWinSound();
    }
  }, [winner]);

  useEffect(() => {
    if (!gameOn) {
      playWinSound();
    }
  }, [gameOn]);

  const displayBoard = () => {
    return (
      <div className={`board ${theme}`}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className={`cell ${theme}`}
                onClick={() => {
                  handleCellClick(rowIndex, colIndex);
                  playClickSound();
                }}
                disabled={cell !== ' ' || !gameOn}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handlePlayAgain = () => {
    setBoard(Array(boardSize).fill(null).map(() => Array(boardSize).fill(' ')));
    setTurn(chooseFirst());
    setGameOn(true);
    setWinner(null);
  };

  const handleLeaderboardClick = () => {
    window.open('https://sites.google.com/view/who-is-lick-ball-master/leaderboard', '_blank');
  };

  return (
    <div className={`game-container ${theme}`}>
      <h1>Tic Tac Toe</h1>
      {showSettings && (
        <div className="settings">
          <label>Theme: </label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {/* ... (Your marker, board size, difficulty selections) */}
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      )}
      {!showSettings && (
        <div>
          {displayBoard()}
          {quizQuestion && (
            <div className="quiz">
              <p>Question: What is the answer for "{quizQuestion}"?</p>
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
              />
              <button onClick={() => handleAnswerSubmit(quizAnswer, null, null)}>
                Submit Answer
              </button>
            </div>
          )}
          {winner && <p>{winner === 'Tie' ? 'The game is a tie!' : `The ${winner} has won!`}</p>}
          {!gameOn && (
            <div>
              <button onClick={handlePlayAgain}>Play Again</button>
              <button onClick={handleLeaderboardClick}>Leaderboard</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TicTacToe;