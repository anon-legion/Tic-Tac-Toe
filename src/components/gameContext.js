// react function component that renders the game context

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { minimax, isWin } from '../scripts/engine.js';


const LABEL = {
  PLAYER: 'Player',
  COMPUTER: 'MiniMax'
};

const labelSelector = (bool) => {
  return bool ? LABEL.COMPUTER : LABEL.PLAYER;
}

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

  // player configuration state
  const [config, setConfig] = useState(() =>{
    return {
      X: {
        isComputer: false,
        label: LABEL.PLAYER
      },
      O: {
        isComputer: false,
        label: LABEL.PLAYER
      }
    };
  });
  
  // game over state
  const [winner, setWinner] = useState(() => []);
  
  // turn state
  const [turn, setTurn] = useState(() => 0);

  // count number of turns state
  const turnCount = useRef(0);

  
  const gridController = ((row, col) => {
    // add a value/move to the grid array
    const newMove = (row, col) => {      
      const newGrid = [...gridArray];
      newGrid[row][col] = turn;
      setGridArray(prevState => [...newGrid]);
      // check if game is over
      const { win, winArr } = isWin(turn, gridArray);
      if (win) {
        //add winning squares to win state
        winController.winGame(winArr);
      } else {
        flipTurn();
      };
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

  // button function module
  const buttonModule = (() => {
    const resetGame = () => {
      gridController.resetGrid();
      winController.newGame();
      setTurn(prevState => 0);
      turnCount.current = 0;
    };

    const startGame = () => {
      setTurn(prevState => 1);
      turnCount.current = 0;
    };

    return {
      resetGame,
      startGame
    };    
  })()

  // function that calculates and performs computer move
  const computerMove = () => {
    // call minimax function
    if ((config.X.isComputer && turn > 0) || (config.O.isComputer && turn < 0)) {
      const [row, col] = minimax(gridArray, turn).move;
      // perform computer move
      setTimeout(() => {gridController.newMove(row, col)}, 400);
    }
  }

  // useEffect that auto increments turnCount ref
  // and calls computerMove function if turn is computer
  useEffect(() => {
    if (turnCount.current < 9) {
      computerMove();
    };
    turnCount.current = turnCount.current + 1
  }, [turn]);
  

  // function that toggles symbol isComputer and label state
  const toggleConfig = (symbol) => {
    const newConfig = {...config};
    newConfig[symbol].isComputer = !newConfig[symbol].isComputer;
    newConfig[symbol].label = labelSelector(newConfig[symbol].isComputer);
    setConfig(prevState => newConfig);
  };


  return (
    <GameContext.Provider value={{
      gridArray,
      gridController,
      turn,
      flipTurn,
      winner,
      winController,
      turnCount,
      buttonModule,
      config,
      toggleConfig
    }}>
      {children}
    </GameContext.Provider>
  )
}
