// Pure tic-tac-toe rules. Board cells hold 'X', 'O' or null.
export const X = 'X';
export const O = 'O';

export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function otherMark(mark) {
  return mark === X ? O : X;
}

export function emptyBoard() {
  return Array(9).fill(null);
}

export function emptyCells(board) {
  return board.flatMap((cell, i) => (cell ? [] : [i]));
}

export function winningLine(board) {
  return LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]) ?? null;
}

export function isFull(board) {
  return board.every(Boolean);
}

export function placeMark(board, index, mark) {
  const next = [...board];
  next[index] = mark;
  return next;
}

// 'X' / 'O' when someone has won, 'draw' when the board is full, otherwise null.
export function outcome(board) {
  const line = winningLine(board);
  if (line) return board[line[0]];
  return isFull(board) ? 'draw' : null;
}
