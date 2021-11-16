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
  return !arr[row][col] ? true : false;
};

// tic-tac-toe minimax alpha-beta pruning algorithm
export const minimax = (arrRef, playerId, depth=0, alpha=-Infinity, beta=Infinity) => {
  // create shallow copy of each row in 2D array of arrRef to prevent mutating original array
  // arguments of JavaScript functions/methods are references to their original values
  const arr = arrRef.map(row => [...row]);

  // helper function to determine if game is over
  const { win } = isWin(playerId, arr);

  // base case: game is over
  // if game is over, return score
  if (win) {
    return { score: 10 - depth };
  } else if (arr.every(row => row.every(col => col !== 0))) {
    // if game is a tie, return score
    return { score: 0 };
  }
  
  // recursive case: game is not over
  let bestScore = -Infinity;
  let bestMove = null;

  // iterate through all possible moves
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // if move is valid and square is not taken make move
      if (isValidMove(arr, i, j)) {
        arr[i][j] = playerId;
        
        // get negative score of opponent's move (recursive call)
        // in the recursion, opponent will maximize score resulting in negative/opposite effect on current player
        // therefore opponent's score is a negative evaluation to current player
        // switch playerId to opponent id,  decrement depth by 1 (recursive call), evaluate alpha as -beta and beta as -alpha
        let score = -minimax(arr, -playerId, depth + 1, -beta, -alpha).score;

        // if score is better than best score, update best score and best move (for this depth)
        if (score > bestScore) {
          bestScore = score;
          bestMove = [i, j];
        };

        // if score is better than alpha, update alpha
        alpha = Math.max(alpha, score);

        // if alpha is greater than beta, prune tree and return best score and best move (for this depth)
        if (alpha >= beta) {
          break;
        };

        // undo move for next iteration of loop (for this depth)
        arr[i][j] = 0;
      };
    };
  };

  // return best score and best move (for this depth)
  return { score: bestScore, move: bestMove };
};