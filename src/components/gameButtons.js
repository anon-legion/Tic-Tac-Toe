// react function component for the game buttons

import React from 'react';
import { useGameContext } from './gameContext';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function GameButtons() {
  const { buttonModule, turn, turnCount } = useGameContext();
  return (
    <>
      {/* change button function from startGame if game is not in playing state (turn === 0) to resetGame otherwise, disable button on first move */}
      <button className={`button is-link ${turn ? 'is-outlined' : null} button-min-width`} onClick={turn ? buttonModule.resetGame : buttonModule.startGame} disabled={turn && !turnCount.current? true : false}>
        <span className="is-size-5">{turn ? 'Reset' : 'Start'}</span>
      </button>
    </>
  );
}