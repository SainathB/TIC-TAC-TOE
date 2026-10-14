import { useEffect, useState } from 'react';
import { useTicTacToe } from '../game/useTicTacToe.js';
import Board from './Board.jsx';

export default function Game({ mode, names, symbols, onChangeNames }) {
  const game = useTicTacToe({ players: mode.players, firstTurn: mode.firstTurn });
  const [showResult, setShowResult] = useState(false);

  // Leave the final board visible for a second before showing the result.
  useEffect(() => {
    if (!game.result) return;
    const timer = setTimeout(() => setShowResult(true), 1000);
    return () => clearTimeout(timer);
  }, [game.result]);

  function playAgain() {
    game.reset();
    setShowResult(false);
  }

  const message = game.result === 'draw' ? 'Match Draw!' : `${names[game.result]} Wins!`;
  const status = game.result
    ? message
    : game.canPlay
      ? `${names[game.turn]}'s turn`
      : `${names[game.turn]} is thinking…`;

  return (
    <div className="card game">
      <div className="players">
        {Object.keys(mode.players).map((mark, i) => (
          <PlayerTag
            key={mark}
            name={names[mark]}
            symbol={symbols[mark]}
            active={!game.result && game.turn === mark}
            winner={game.result === mark}
            vs={i > 0}
          />
        ))}
      </div>

      <div className="board-wrap">
        <Board
          board={game.board}
          symbols={symbols}
          highlight={game.winningLine}
          disabled={!game.canPlay}
          onPlay={game.play}
        />

        {showResult && (
          <div className="result">
            <h2>{message}</h2>
            <div className="actions">
              <button className="btn primary" onClick={playAgain}>Play Again!</button>
              <button className="btn" onClick={onChangeNames}>Change Players</button>
            </div>
          </div>
        )}
      </div>

      <p className="status">{status}</p>
    </div>
  );
}

function PlayerTag({ name, symbol, active, winner, vs }) {
  return (
    <>
      {vs && <span className="vs">vs</span>}
      <div className={`player${active ? ' active' : ''}${winner ? ' winner' : ''}`}>
        <img src={symbol.src} alt="" className="mini-mark" />
        <span>{name}</span>
      </div>
    </>
  );
}
