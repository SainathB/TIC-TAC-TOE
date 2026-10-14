import { O, X } from './game/rules.js';
import cross from './assets/cross.png';
import dot from './assets/dot.png';

// Images used to draw each mark. Swap this map to re-skin the board.
export const SYMBOLS = {
  [X]: { src: cross, label: 'X' },
  [O]: { src: dot, label: 'O' },
};
