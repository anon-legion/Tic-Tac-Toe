// react function component that renders a 3 by 3 grid of squares

import React, { useCallback } from 'react';
import { imgSelector } from '../scripts/engine.js';
import { useGameContext } from './gameContext.js';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function Grid() {
  // use custom hook to access game states
  const {
    gridArray,
    turn,
    gridController,
    winner,
    config
  } = useGameContext();


  const handleClick = (row, col) => {
    // add value/move to grid array
    gridController.newMove(row, col);
  }

  // helper function checks if computer to play current turn
  const isComputerTurn = useCallback(() => {
    const isXComputerTurn = () => {
      return config.X.isComputer && turn === 1 ? true : false;
    };
    const isOComputerTurn = () => {
      return config.O.isComputer && turn === -1 ? true : false;
    };
    return isXComputerTurn() || isOComputerTurn()
  }, [config, turn])
  
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
                // disable onClick event handler if game is over or square is already filled or game is not in playing state (turn === 0) or is computer turn
                onClick={winner.length || col || !turn || isComputerTurn()? null : () => handleClick(rowIndex, columnIndex)}
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