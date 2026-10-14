import { useState } from 'react';

function defaultNames(mode) {
  return Object.fromEntries(Object.keys(mode.players).map((mark) => [mark, '']));
}

export default function Setup({ modes, symbols, initial, onStart }) {
  const [modeId, setModeId] = useState(initial?.modeId ?? modes[0].id);
  // Names typed for each mode, so switching modes doesn't lose them.
  const [namesByMode, setNamesByMode] = useState(() =>
    Object.fromEntries(
      modes.map((m) => [m.id, m.id === initial?.modeId ? initial.names : defaultNames(m)])
    )
  );

  const mode = modes.find((m) => m.id === modeId);
  const names = namesByMode[modeId];

  function setName(mark, value) {
    setNamesByMode({ ...namesByMode, [modeId]: { ...names, [mark]: value } });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const finalNames = Object.fromEntries(
      Object.entries(mode.players).map(([mark, player]) => [mark, names[mark].trim() || player.defaultName])
    );
    onStart(mode, finalNames);
  }

  return (
    <form className="card setup" onSubmit={handleSubmit}>
      <div className="mode-toggle" role="radiogroup" aria-label="Game mode">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={m.id === modeId}
            className={m.id === modeId ? 'active' : ''}
            onClick={() => setModeId(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <h2>Who's playing?</h2>
      {Object.entries(mode.players).map(([mark, player], i) => (
        <label className="field" key={`${modeId}-${mark}`}>
          <span className="field-label">
            <img src={symbols[mark].src} alt="" className="mini-mark" /> {player.label}
          </span>
          <input
            autoFocus={i === 0}
            value={names[mark]}
            maxLength={20}
            placeholder={player.defaultName}
            onChange={(e) => setName(mark, e.target.value)}
          />
        </label>
      ))}
      <button type="submit" className="btn primary">Start Game</button>
    </form>
  );
}
