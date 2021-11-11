// react fcuntion component to display game status

import React, { useState, useEffect } from 'react';
import { useGameContext } from './gameContext';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function GameDisplay() {
  const { turn, winner } = useGameContext();

  const [playerStatus, setPlayerStatus, isPlaying] = useState(() => {
    return {
      X: '',
      O: '',
    }
  });


  useEffect(() => {
    switch (turn) {
      case 1:
        setPlayerStatus(prevState => {
          return {
            X: isGameOver() ? 'WIN!' : 'Turn',
            O: isGameOver() ? 'LOSE!' : null,
          }
        });
        break;
      case -1:
        setPlayerStatus(prevState => {
          return {
            X: isGameOver() ? 'LOSE!' : null,
            O: isGameOver() ? 'WIN!' : 'Turn',
          }
        });
        break;
      default:
        return playerStatus;        
    }  
  },[turn, winner]);
        
        
  // function to check if winner array is not empty, if empty then no winner
  // returns false if empty and true if not empty
  const isGameOver = () => {
    return winner.length;
  }

  // check if game has started
  // returns false if ALL playerStatus attributes are empty
  const isGameStart = () => {
    return !(!playerStatus.X && !playerStatus.O);
  }

  // create playerStatus module to be used in useEffect
  // const playerStatusController = (n) => {

  // }



  return (
    <>
      <div className="columns is-variable is-1 is-mobile">
        <div className="column is-half">
          <div className="section p-0 pl-3 min-height-1">
            <h4 className="is-size-5 has-text-link">{playerStatus.X}</h4>
          </div>
          <div className="box p-3 player-x">
            <h4 className="is-size-5 has-text-white">Player</h4>
          </div>
        </div>
        <div className="column is-half">
          <div className="section p-0 pr-3 has-text-right min-height-1">
            <h4 className="is-size-5 has-text-link">{playerStatus.O}</h4>
          </div>
          <div className="box p-3 has-text-right player-o">
            <h4 className="is-size-5 has-text-white">Player</h4>
          </div>
        </div>
      </div>
    </>
  )

}