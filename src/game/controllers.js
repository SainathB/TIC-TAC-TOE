import { emptyCells, otherMark, placeMark, winningLine } from './rules.js';

// A controller decides how a player's moves are made.
// Human controllers have no chooseMove: their moves come from board clicks.
// Automatic controllers implement chooseMove(board, mark) -> cell index.
// New kinds of player (harder bots, remote players, ...) are new controllers;
// the game engine does not change.

export const humanController = { kind: 'human' };

export function isAutomatic(controller) {
  return typeof controller.chooseMove === 'function';
}

// The original bot: open on a random cell, then take the first winning cell,
// otherwise block the first cell where the opponent would win,
// otherwise take the last empty cell.
export function createClassicBot({ random = Math.random } = {}) {
  return {
    kind: 'computer',
    chooseMove(board, mark) {
      const empty = emptyCells(board);
      if (empty.length === board.length) {
        return empty[Math.floor(random() * empty.length)];
      }

      const winsFor = (who) => (i) => winningLine(placeMark(board, i, who)) !== null;
      return (
        empty.find(winsFor(mark)) ??
        empty.find(winsFor(otherMark(mark))) ??
        empty[empty.length - 1]
      );
    },
  };
}
