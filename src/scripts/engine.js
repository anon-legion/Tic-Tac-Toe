import imgX from '../img/ttt_x.png';
import imgO from '../img/ttt_o.png';

// displays appropriate image for current player/turn
export const imgSelector = (n) => {
  if (n > 0) {
    return imgX;
  } else if (n < 0) {
    return imgO;
  } else {
    return null;
  }
}

// win condition function
export const isWin = (playerId, arr) => {
  let win = false;
  let winArr = [];

  // check for horizontal win
  for (let i = 0; i < arr.length; i++) {
    // if (arr[i][0] === playerId && arr[i][1] === playerId && arr[i][2] === playerId) {
    if (arr[i].every(el => el === playerId)) {
      win = true;
      winArr = [`${i}0`, `${i}1`, `${i}2`];
      break;
    }
  }

  // check for vertical win
  const getColumnVals = (i) => {
    return [arr[0][i], arr[1][i], arr[2][i]];
  }

  for (let i = 0; i < arr.length; i++) {
    // if (arr[0][i] === playerId && arr[1][i] === playerId && arr[2][i] === playerId) {
      if (getColumnVals(i).every(el => el === playerId)) {
      win = true;
      winArr = [`0${i}`, `1${i}`, `2${i}`];;
      break;
    }
  }

  // check for diagonal win
  if (arr[0][0] === playerId && arr[1][1] === playerId && arr[2][2] === playerId) {
    win = true;
    winArr = ['00', '11', '22'];
  } else if (arr[0][2] === playerId && arr[1][1] === playerId && arr[2][0] === playerId) {
    win = true;
    winArr = ['02', '11', '20'];
  }

  return { win, winArr };
};

// checks if move is valid
export const isValidMove = (arr, row, col) => {
  return !arr[row][col]
};

// tic-tac-toe minimax alph-beta pruning algorithm
export const minimax = (arr, depth, playerId, alpha, beta) => {
  const { win, winArr } = isWin(playerId, arr);

  if (win) {
    return { score: 10 - depth, winArr };
  } else if (arr.every(el => el.every(el => el !== 0))) {
    return { score: 0, winArr };
  }

  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (isValidMove(arr, i, j)) {
        arr[i][j] = playerId;

        let score = -minimax(arr, depth + 1, -playerId, -beta, -alpha).score;

        if (score > bestScore) {
          bestScore = score;
          bestMove = [i, j];
        }

        alpha = Math.max(alpha, score);

        if (alpha >= beta) {
          break;
        }

        arr[i][j] = 0;
      }
    }
  }

  return { score: bestScore, winArr };
}
