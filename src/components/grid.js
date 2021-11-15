// react function component that renders a 3 by 3 grid of squares

import React from 'react';
import { isWin, imgSelector } from '../scripts/engine.js';
import { useGameContext } from './gameContext.js';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function Grid() {
  // use custom hook to access game states
  const {
    gridArray,
    turn,
    flipTurn,
    gridController,
    winner,
    winController
  } = useGameContext();


  const handleClick = (row, col) => {
    // add value/move to grid array
    gridController.newMove(row, col);
    // check if game is over
    const { win, winArr } = isWin(turn, gridArray);
    if (win) {
      //add winning squares to win state
      winController.winGame(winArr);
      // disable playing state
    } else {
      flipTurn();
    }
  }

	
  return (
    <>
      {gridArray.map((row, rowIndex) => {
        return (
          row.map((col, columnIndex) => {
            return (              
              <div
                key={`${rowIndex}${columnIndex}`}
                // add border to squares and add class on win to highlight and animate winning squares
                className={`square-${rowIndex}${columnIndex} ${winner.includes(`${rowIndex}${columnIndex}`) ? 'has-background-success-dark is-win' : ''}`}
                value={gridArray[rowIndex][columnIndex]}
                // disable onClick event handler if game is over or square is already filled or game is not in playing state (turn === 0)
                onClick={winner.length || col || !turn ? null : () => handleClick(rowIndex, columnIndex)}
              >
                <img src={imgSelector(gridArray[rowIndex][columnIndex])} alt={gridArray[rowIndex][columnIndex] === 0 ? '' : "X or O"} />
              </div>
            );
          })
        );
      })}
    </>
  );
}