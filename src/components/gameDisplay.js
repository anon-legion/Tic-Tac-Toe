// react fcuntion component to display game status

import React, { useState, useEffect } from 'react';
import { useGameContext } from './gameContext';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function GameDisplay() {
  const { turn, winner, turnCount } = useGameContext();

  const [playerStatus, setPlayerStatus] = useState(() => {
    return {
      X: '',
      O: '',
    }
  });


  useEffect(() => {
    console.log(`turn =\t${turn}\nturnCount =\t${turnCount.current}`)
    // function checks if there is already a winner
    // returns true if winner array is not empty, false otherwise
    const isGameOver = () => {
      return winner.length;
    }
    // do if moves have been exhausted and no winner, game is draw
    if (turnCount.current >= 9 && !isGameOver()) {
      setPlayerStatus(prevState => {
        return {
          X: 'DRAW',
          O: 'DRAW'
        }
      })
    } else {
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
          return null;        
      }
    }
  },[turn, winner, turnCount]);
        

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