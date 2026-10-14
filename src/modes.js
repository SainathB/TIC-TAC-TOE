import { O, X } from './game/rules.js';
import { createClassicBot, humanController } from './game/controllers.js';

// Each game mode describes its players and who moves first.
// Adding a mode means adding an entry here; no component needs to change.
export function createModes({ random = Math.random } = {}) {
  return [
    {
      id: 'computer',
      label: 'Play with Computer',
      firstTurn: O,
      players: {
        [X]: { label: 'Your name', defaultName: 'Player', controller: humanController },
        [O]: { label: "Computer's name", defaultName: 'Computer', controller: createClassicBot({ random }) },
      },
    },
    {
      id: 'friend',
      label: 'Play with a Friend',
      firstTurn: X,
      players: {
        [X]: { label: 'Player 1 name', defaultName: 'Player 1', controller: humanController },
        [O]: { label: 'Player 2 name', defaultName: 'Player 2', controller: humanController },
      },
    },
  ];
}
