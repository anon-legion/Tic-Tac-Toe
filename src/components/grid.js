// react function component that renders a 3 by 3 grid of squares

import React from 'react';
import { isWin, imgSelector } from '../scripts/engine.js';
import { useGameContext } from './gameContext.js';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function Grid() {
  // use custom hook to access game states
  const { gridArray, turn, flipTurn, gridController, winner, winController, isPlaying, toggleIsPlaying } = useGameContext();


  const handleClick = (row, col) => {
    // add value/move to grid array
    gridController.newMove(row, col);
    // check if game is over
    const { win, winArr } = isWin(turn, gridArray);
    if (win) {
      //add winning squares to win state
      winController.winGame(winArr);
      // disable playing state
      toggleIsPlaying();
    } else {
      flipTurn();
    }
  }

  // create a game over function that resets the game
	
  return (
    <>
      {gridArray.map((row, yAxis) => {
        return (
          row.map((col, xAxis) => {
            return (              
              <div
                key={`${yAxis}${xAxis}`}
                // add border to squares and add class on win to highlight winning squares
                className={`square-${yAxis}${xAxis} ${winner.includes(`${yAxis}${xAxis}`) ? 'has-background-success-dark' : ''}`}
                value={gridArray[yAxis][xAxis]}
                // disable onClick event if game is over
                onClick={isPlaying ? () => handleClick(yAxis, xAxis) : null}
              >
                <img src={imgSelector(gridArray[yAxis][xAxis])} alt={gridArray[yAxis][xAxis] === 0 ? '' : "X or O"} />
              </div>
            );
          })
        );
      })}
    </>
  );
}