// react function component that renders the game context

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { isValidMove } from '../scripts/engine.js';


const GameContext = createContext();

// custom hook that returns the game context for use in components
export function useGameContext() {
  return useContext(GameContext);
}

export const GameProvider = ({ children }) => {
  // initial grid state
  const [gridArray, setGridArray] = useState(() => [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);

  // const [player, setPlayer] = useState(() => 1);
  
  // game over state
  const [winner, setWinner] = useState(() => []);
  
  // turn state
  const [turn, setTurn] = useState(() => 1);

  // count number of turns state
  const turnCount = useRef(0);

  // state of play used by grid event handlers
  const [ isPlaying, setIsPlaying ] = useState(() => true);
  
  const gridController = ((row, col) => {
    // add a value/move to the grid array
    const newMove = (row, col) => {
      // check if move is valid, do nothing if not
      if (isValidMove(gridArray, row, col)) {
        const newGrid = [...gridArray];
        newGrid[row][col] = turn;
        setGridArray(prevState => [...newGrid]);
      }
    };
    
    const resetGrid = () => {
      setGridArray(prevState => [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    };
    
    return {
      newMove,
      resetGrid
    }
  })();
  
  const winController = ((arr) => {
    const winGame = (arr) => {
      setWinner(prevState => [...arr]);
    };
    
    const newGame = () => {
      setWinner(prevState => []);
    };
    
    return {
      winGame,
      newGame
    }
  })()
  
  // toggle turn state
  const flipTurn = () => {
    setTurn(prevTurn => prevTurn * -1);
  };  

  // toggle playing state
  const toggleIsPlaying = () => {
    setIsPlaying(prevState => !prevState);
  };


  // useEffect that auto increments turnCount ref
  useEffect(() => {
    turnCount.current = turnCount.current + 1
  }, [turn])


  return (
    <GameContext.Provider value={{
      gridArray,
      gridController,
      turn,
      flipTurn,
      winner,
      winController,
      isPlaying,
      toggleIsPlaying,
      turnCount
    }}>
      {children}
    </GameContext.Provider>
  )
}
