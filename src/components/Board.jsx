function Cell({ value, symbols, highlight, disabled, onClick }) {
  const symbol = value && symbols[value];
  return (
    <button
      className={`cell${highlight ? ' win' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={symbol ? symbol.label : 'Empty cell'}
    >
      {symbol && <img src={symbol.src} alt={symbol.label} />}
    </button>
  );
}

export default function Board({ board, symbols, highlight, disabled, onPlay }) {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Cell
          key={i}
          value={value}
          symbols={symbols}
          highlight={highlight.includes(i)}
          disabled={disabled}
          onClick={() => onPlay(i)}
        />
      ))}
    </div>
  );
}
