import { useEffect, useReducer } from 'react';
import { emptyBoard, otherMark, outcome, placeMark, winningLine } from './rules.js';
import { isAutomatic } from './controllers.js';

function initialState(firstTurn) {
  return { board: emptyBoard(), turn: firstTurn, result: null };
}

function reducer(state, action) {
  switch (action.type) {
    case 'move': {
      const { index, mark } = action;
      // Ignore stale or invalid moves (wrong turn, taken cell, finished game).
      if (state.result || mark !== state.turn || state.board[index]) return state;
      const board = placeMark(state.board, index, mark);
      return { board, turn: otherMark(mark), result: outcome(board) };
    }
    case 'reset':
      return initialState(action.firstTurn);
    default:
      return state;
  }
}

// Runs a game between two players, each described by { controller }.
// The hook only knows the controller interface, not which bot or person is playing.
export function useTicTacToe({ players, firstTurn, moveDelay = 300 }) {
  const [state, dispatch] = useReducer(reducer, firstTurn, initialState);
  const controller = players[state.turn].controller;
  const automatic = isAutomatic(controller);

  useEffect(() => {
    if (state.result || !automatic) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'move', mark: state.turn, index: controller.chooseMove(state.board, state.turn) });
    }, moveDelay);
    return () => clearTimeout(timer);
  }, [state, controller, automatic, moveDelay]);

  return {
    ...state,
    winningLine: winningLine(state.board) ?? [],
    canPlay: !state.result && !automatic,
    play: (index) => {
      if (!automatic) dispatch({ type: 'move', mark: state.turn, index });
    },
    reset: () => dispatch({ type: 'reset', firstTurn }),
  };
}
