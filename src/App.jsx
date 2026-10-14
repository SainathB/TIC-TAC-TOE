import { useState } from 'react';
import Setup from './components/Setup.jsx';
import Game from './components/Game.jsx';

export default function App({ modes, symbols }) {
  const [session, setSession] = useState(null);
  const [lastSetup, setLastSetup] = useState(null);

  function start(mode, names) {
    setLastSetup({ modeId: mode.id, names });
    setSession({ mode, names });
  }

  return (
    <main className="app">
      <h1 className="title">Tic Tac Toe</h1>
      {session ? (
        <Game
          mode={session.mode}
          names={session.names}
          symbols={symbols}
          onChangeNames={() => setSession(null)}
        />
      ) : (
        <Setup modes={modes} symbols={symbols} initial={lastSetup} onStart={start} />
      )}
    </main>
  );
}
